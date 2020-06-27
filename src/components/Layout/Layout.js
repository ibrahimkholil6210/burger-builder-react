import React from 'react';
import Aux from '../../hoc/Auxiliary';

export default function Layout(props) {
    return (
        <Aux>
            <div>
                Toolbar,SideDrawer,BackDrop
            </div>
            <main>
                {props.children}
            </main>
        </Aux>
    )
}
