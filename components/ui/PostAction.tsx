const PostAction = () => {
  return (
    <div className="btn-group cus-dropdown dropend">
      <button
        type="button"
        className="dropdown-btn px-2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="material-symbols-outlined fs-xxl m-0">more_horiz</i>
      </button>
      <ul className="dropdown-menu p-4 pt-2">
        <li>
          <button className="droplist d-flex align-items-center gap-2">
            <i className="material-symbols-outlined mat-icon">chat</i>
            <span>Message</span>
          </button>
        </li>
        <li>
          <button className="droplist d-flex align-items-center gap-2">
            <i className="material-symbols-outlined mat-icon">person_remove</i>
            <span>Unfollow</span>
          </button>
        </li>
        <li>
          <button className="droplist d-flex align-items-center gap-2">
            <i className="material-symbols-outlined mat-icon">bookmark_add</i>
            <span>Save Post</span>
          </button>
        </li>
        <li>
          <button className="droplist d-flex align-items-center gap-2">
            <i className="material-symbols-outlined mat-icon">lock</i>
            <span>Block User</span>
          </button>
        </li>
        <li>
          <button className="droplist d-flex align-items-center gap-2">
            <i className="material-symbols-outlined mat-icon">flag</i>
            <span>Report User</span>
          </button>
        </li>
        <li>
          <button
            className="droplist d-flex align-items-center gap-2"
            style={{ color: "#FF0000" }} // Red color for Cancel
          >
            <i
              className="material-symbols-outlined mat-icon"
              style={{ color: "#FF0000" }}
            >
              cancel
            </i>
            <span>Cancel</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PostAction;
