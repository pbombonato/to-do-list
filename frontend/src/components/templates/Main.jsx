import React from "react"
import './Main.css'

export default props =>
    <main className="content">
        <div>
            {props.children}
        </div>
    </main>