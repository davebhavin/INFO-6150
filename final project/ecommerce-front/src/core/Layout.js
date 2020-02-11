import React from "react";
import Menu from "./Menu";
import "../styles.css";
const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
    <div>
}
    <div className={className}>{children}</div>
        
</div>

<div class ="footer">     
        <p> <i>Copyright © 2019 LiveLaughLife </i></p>
        <a href="http://www.facebook.com" target="_blank" class="fa fa-facebook"></a>
        <a href="https://twitter.com/" target="_blank" class="fa fa-twitter"></a>
        <a href="https://accounts.google.com/" target="_blank" class="fa fa-google"></a>
        <a href="https://instagram.com/" target="_blank" class="fa fa-instagram"></a>
</div>

</div>

);
export default Layout;