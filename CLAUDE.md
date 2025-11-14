# CLAUDE.md

It is a web service that is used at Nexten Electronics to inspect contact pin.
The main feature of this service is analysis, editing, learning of contact pin.
Analysis feature is that show many graphs about current's production situation for normal pin, exception pin.
Editing feature is that can edit received polygon image about many points ai's made.
Learning feature is that can choose learning data to make a ai model.

# MCP Servers

## Figma Dev Mode MCP Rules

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload. And You can use react-icons library.

# Tech Spec

Please Check dependencies in ./package.json file.

- **Development**: Next.js, TypeScript, React.js
- **Styling**: tailwindcss@4
- **API Request**: fetch
- **Animation** : motion
- **State Manipulatation** : Zustand

# Directory Architecture

figma-mcp/
├── public/ /* statical assets e.g. png, jpg, ... and fonts */
│   ├── assets
│   └── fonts
├── app/
│   ├── globals.css /* style file that used in entire project file */
│   ├── layout.tsx  /* common layout that used in entire project file */
│   ├── page.tsx    /* the root page that users can meet first when they execute this platform */
│   ├── accounts/   /* a page that can only access for manager member. a page that manage member's account. */
│   ├── analysis/   /* a platform that analyze a situation that contact pin is made */
│   │   ├── main/   
│   │   |   └── page.tsx  /* a page that can view production line, many graphs about current production situation daily, weekly, monthly, annual. */
│   │   ├── upload/ 
│   │   |   └── page.tsx  /* a page that can upload png file or folder of png files. */
│   │   ├── result/
│   │   |   └── page.tsx  /* a page that can view production data about production item, date, result, model etc.  */
│   ├── edit-info/   
│   │   ├── page.tsx      /* a page that can edit member's info */
│   ├── learning/   /* a platform that execute model's learning, view current's models, manage production line */
│   │   ├── management/
│   │   |   └── page.tsx  /* a page that can view current's production lines, detail information about selected production line. */
│   │   ├── models/
│   │   |   └── page.tsx  /* a page that can view current's completed models */
│   │   ├── progress/
│   │   |   └── page.tsx  /* a page that can view current's situation about models, execute learning of model. */
│   ├── login/
│   |   └── page.tsx/     /* a page that user can login or move to signup page  */  
│   ├── processing/
│   |   ├── main/
│   |   |   └── page.tsx  /* a page that can view production line, many graphs about contact pin production situation. */ 
│   |   ├── process-data/
│   |   |   └── page.tsx  /* a page that can view datas about contact pin, confirm processing result, edit polygon images about position of points. */
│   └── signup/
│   |   └── page.tsx/     /* a page that user can signup for this platform  */  
├── components/
│   ├── common/     /* a directory that contains components that used in many pages. */


# Implement

- Each page is managed via [app] directory.
- If you need implement some page, follow Directory Architecture rules.
- This project is using app router in next.js. So you should make a page as naming 'page.tsx' below each route in [app] directory.
- If you need to make components that needs in some page, please make a directory that has same name with page name in [components] directory.
- You should declare model and api when you need implement some page. see the figma design and judgment what data is necessary.
- If you think it is a frequently used component, such as a button or input, please implement it flexibly in shared so that the component can be commonly used. And please make it in [components/common] directory.

# Avoid Pattern

- Do not use any type. If need some interface or type, you can write [feature page name]/types.d.ts in [types] directory and export it.
- You can use gap or empty `h-{} div` instead of margin and padding. Please avoid margin/padding styling pattern as you can.
- If a component file has more than 200 lines of code, please separate the hooks or components into modules.
- Do not use `React.[module]` pattern. please just import and use it.
- Do not use inline function. please make a handler function and use it. you can naming function with this rule via `'handle'{target}{eventName}` e.g. handleCTAButtonClick, handleAgeInputChange, etc.
- Do not use inline style css.
- If you need assets, you can copy as SVG code in figma. do not implement yourself asset file, just use svg and convert to svg component.
- Please avoid publish with `relative`, `absolute`. you can use flex and grid tailwindcss keyword.
