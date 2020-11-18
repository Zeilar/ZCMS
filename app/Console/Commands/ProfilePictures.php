<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Storage;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use App\Models\User;

class ProfilePictures extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'profile-pictures';

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
     *
     * @return int
     */
    public function handle()
    {
        $users = User::where('avatar', 'default.png');
        if ($users->count() <= 0) {
            return $this->warn('No users with default avatar');
        }
        $bar = $this->output->createProgressBar($users->count());
        $users->each(function($user) use ($bar) {
            $generatedUser = json_decode(file_get_contents('https://randomuser.me/api'));
            $picture = $generatedUser->results[0]->picture->medium;
            $name = Str::uuid() . substr($picture, strrpos($picture, '/') + 1);
            Storage::put('public\avatars\\'.$name, file_get_contents($picture));
            $user->update(['avatar' => $name]);
            sleep(5);
            $bar->advance();
        });
        $bar->finish();
    }
}
