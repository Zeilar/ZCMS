<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Storage;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use App\Models\Setting;
use App\Models\User;
use Exception;

class FillAvatars extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill-avatars';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Download random profile pictures and assign them to users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     * Take users with default avatars and assign them a new random one.
     *
     * @return void
     */
    public function handle()
    {
        if (env('APP_ENV') !== 'local' && !$this->confirm('You are not in development mode! This will overwrite existing users, are you sure?')) {
            return;
        }

        // Get users that have the default avatar
        $users = User::whereDoesntHave('settings', function($query) {
            return $query->where('name', 'avatar')->where('value', '!=', null);
        })->get();
        $count = $users->count();
        if ($count <= 0) {
            return $this->warn('No users with default avatar');
        }
        $bar = $this->output->createProgressBar($count);
        $users->each(function($user) use ($bar) {
            $bar->advance();
            try {
                $generatedUser = json_decode(file_get_contents('https://randomuser.me/api'));
            } catch (Exception $e) {
                $this->error("\n" . $e->getMessage());
                die;
            }
            $picture = $generatedUser->results[0]->picture->medium;
            $name = Str::uuid() . substr($picture, strrpos($picture, '/') + 1);
            Storage::put('public\avatars\\'.$name, file_get_contents($picture));
            $avatarSetting = Setting::where('name', 'avatar')->first();
            $user->settings()->attach($avatarSetting, ['value' => $name]);
        });
        $bar->finish();
        $this->line("\n<fg=green>Installed $count avatars</>");
    }
}
