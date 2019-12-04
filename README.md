# Directory Management
Folder comparision and file deletion APIs using node.js

### Example

### compare

curl -X POST \
  http://localhost:3000/directory/compare \
  -d '{
	"fromDirectory":"/home/siva/Desktop/test1",
	"toDirectory":"/home/siva/Desktop/test2"
}'

#### response

{
    "additionalFiles": [
        "/home/siva/desktop/test1/dir1/dir1-file1",
        "/home/siva/desktop/test1/file5",
        "/home/siva/desktop/test1/file6"
    ]
}

### delete

curl -X POST \
  http://localhost:3000/directory/delete \
  -d '{
	"files":[
		"/home/siva/Desktop/test1.txt",
		"/home/siva/Desktop/test2.txt",
    "/home/siva/Desktop/test3.txt",
    "/home/siva/Desktop/test4.txt"
	]
}'

#### response
{
    "message": "Files deleted",
    "err": {
        "errno": -2,
        "syscall": "unlink",
        "code": "ENOENT",
        "path": "/home/siva/Desktop/test1.txt"
    }
}

### Run this project using "npm run start"
