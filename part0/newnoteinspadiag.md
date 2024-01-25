```mermaid
   sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [{ "content": "test", "date": "2024-1-1" }]
    activate server
    server-->>browser: Rerender the notes list
    deactivate server
    
```
