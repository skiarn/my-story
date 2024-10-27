import { useState } from "react";
import './Chapter.css'

const Chapter = ({ title, description, onEdit }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <div className="chapter">
        <div className="chapter-header" onClick={toggleCollapse}>
          <h3>{title}</h3>
          <button>{isCollapsed ? '+' : '-'}</button>
          <button className="edit-chapter-button" onClick={(e) => { e.stopPropagation(); onEdit(title, description); }}>Edit</button>
        </div>
        {!isCollapsed && <p className="chapter-description">{description}</p>}
      </div>
    );
  };

export default Chapter