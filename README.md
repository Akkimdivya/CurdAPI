# RESTful API

Given two files `app.js` and a database file `note.db` consisting a table `list`.

Write APIs to perform operations on the table `list` containing the following columns,

| Columns       | Type    |
| ------------- | ------- |
| no            | INTEGER |
| title         | TEXT    |
| context       | INTEGER |

### API 1

#### Path: `/notes/`

#### Method: `GET`

#### Description:

Returns a list of all notes in the table

#### Response

```
[
  {"no":1,
   "title":"python",
   "content":" Python is a programming language that lets you work quickly and integrate systems more effectively"
  }
  ...
]
```
### API 2

#### Path: `/notes/:no`

#### Method: `GET`

#### Description:

Returns a list based on a note no

#### Response

```
{"no":1,
   "title":"python",
   "content":" Python is a programming language that lets you work quickly and integrate systems more effectively"
}
```
### API 3

#### Path: `/notes/:no`

#### Method: `DELETE`

#### Description:

Deletes a note from the list (database) based on the no

#### Response

```
Note Deleted Successfully
```
### API 4

#### Path: `/notes/`

#### Method: `POST`

#### Description:

Creates a new note in the list (database).

#### Request

```
{
  "no": 6
  "title": "SQL",
  "context": "Bowler"
}
```

#### Response

```
Added
```

### API 5

#### Path: `/notes/:no/`

#### Method: `PUT`

#### Description:

Updates the details of a note in the list (database) based on no

#### Request

```
{
  "title": "SQL",
  "context": "Bowler"
}
```

#### Response

```
success

```



<br/>

Use `npm install` to install the packages.
Use `node app.js` to start node project

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**

