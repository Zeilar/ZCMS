@extends('app')

@section('content')
    <div id="categories">
        @each('components.category', $categories, 'category')
    </div>
@endsection