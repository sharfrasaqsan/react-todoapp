import React from "react";

const Footer = ({ length, checkedTasks, RemainingTasks }) => {
  return (
    <footer>
      <div className="right-site-footer">
        You have added {length === 1 ? length + " task" : length + " tasks"}.
        <br />
        {checkedTasks} of them are completed. {RemainingTasks} remaining.
      </div>

      <div className="left-site-footer">
        <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
