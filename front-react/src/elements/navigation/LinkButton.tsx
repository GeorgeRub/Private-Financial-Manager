import {Link} from "react-router-dom";

// @ts-ignore
const LinkButton = ({href, name}) => {
    return(
        <Link className="pfm-nav-link"  to={href}>{name}</Link>
    )
}

export default LinkButton;