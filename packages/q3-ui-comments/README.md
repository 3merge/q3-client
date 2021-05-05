# 🙊 Q3 Comments

A drop-in commenting component for Q3 APIs. It bakes in
single-level threading, author authorization and rich-text
media handling. All you need to do is provide it a
collection and ID!

## API

| Prop               | Description                                                                            | Type      |
| ------------------ | -------------------------------------------------------------------------------------- | --------- |
| `collectionName`   | The API collection (URL root).                                                         | `string*` |
| `id`               | The parent ID, used with the collection name to fetch initial comments and post photos | `string*` |
| `additionalFields` | React nodes forwarded into the Dialog forms                                            | `node`    |
