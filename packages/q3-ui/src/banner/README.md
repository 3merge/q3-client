You'll likely notice dead space at the top of this component. This is to offset the fixed header that accompanies it in most layouts.

Import one of two variations into your project: `FeaturedPhotoBanner` or `FullWidthBanner`.

| Prop       | Description                                               | Type                 | Required |
| ---------- | --------------------------------------------------------- | -------------------- | -------- |
| `title`    | Hero title                                                | `String`, `Function` | Y        |
| `subtitle` | Expanded description                                      | `String`             | Y        |
| `label`    | Overline text for the hero                                | `String`             | N        |
| `style`    | CSS object to inject                                      | `Object`             | N        |
| `flip`     | Inverse the row direction or column order                 | `Boolean`            | N        |
| `children` | Renders conditionally based on Banner type and flip value | `Node`               | N        |
