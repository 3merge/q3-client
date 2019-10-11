The card component contextualizes a link with a title,
excerpt and image. It's perfect for extended resources,
dashboards and other aggregate-style media.

The card component ships three variations: `NewsCard`, `ResourceCard` and `ProjectCard`.

| Prop          | Description                                    | Type     | Required |
| ------------- | ---------------------------------------------- | -------- | -------- |
| `imgSrc`      | An img URL                                     | `String` | Y        |
| `title`       | Short title to display within an H2            | `String` | Y        |
| `description` | A brief description of the resource            | `String` | Y        |
| `name`        | Used to reference the topic                    | `String` | N        |
| `label`       | A category or identifier                       | `String` | N        |
| `to`          | The HREF attribute for the link                | `String` | Y        |
| `buttonText`  | For the variations that come with faux-buttons | `String` | N        |
