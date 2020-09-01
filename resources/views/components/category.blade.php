<div class="category">
    <div class="categoryHeaders">
        <span>{{ $category->name }}</span>
    </div>
    <div class="subcategories">
        @each('components.subcategory', $category->subcategories, 'subcategory')
    </div>
</div>