import React, { Fragment } from 'react';
import Workspaces, { WorkspaceContents } from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "./index.css";
// import "./custom.css";

const App = () => {
    // default implementation
    return <Workspaces />;

    // Removing the logo
    // return (
    //     <Workspaces components={{
    //         header: {
    //             LogoComponent: () => <Fragment />
    //         }
    //     }} />
    // );

    // Adding a custom button in the system buttons area
    // return (
    //     <Workspaces components={{
    //         header: {
    //             SystemButtonsComponent: () =>
    //                 <button>CustomButton</button>
    //         }
    //     }} />
    // );

    // Adding a toolbar
    // return (
    //     <>
    //         <div>My Toolbar</div>
    //         <Workspaces />
    //     </>
    // );

    // Adding a custom popup
    // return (
    //     <Workspaces components={{
    //         popups: {
    //             AddWorkspaceComponent: (p) =>
    //                   <span>{JSON.stringify(Object.keys(p))}</span>
    //         }
    //     }} />
    // );

    // Extending the workspace contents
    // return (
    //     <Workspaces components={{
    //         WorkspaceContents: (p) =>
    //             <>
    //                 <button>Custom button</button>
    //                 <WorkspaceContents {...p} />
    //             </>
    //     }} />
    // );
}

export default App;
