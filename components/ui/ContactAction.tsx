interface ContactActionProps {
  sectionType: "followers" | "followings";
  actionList?: [string, string][]; // Optional custom action list
}

const ContactAction = ({ sectionType, actionList }: ContactActionProps) => {
  // Define default actions with updated icons
  const defaultActionLists = {
    followers: [
      ["Remove Follower", "block"], // Changed from person_off
      ["Message", "mail"], // Changed from chat
    ],
    followings: [
      ["Unfollow", "block"], // Changed from person_off
      ["Message", "mail"], // Changed from chat
    ],
  };

  // Use actionList if provided, otherwise fall back to defaultActionLists[sectionType]
  const actions = actionList || defaultActionLists[sectionType];

  return (
    <div className="btn-group cus-dropdown dropend">
      <button
        type="button"
        className="d-flex dropdown-btn px-2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="material-symbols-outlined fs-xxl m-0">more_horiz</i>
      </button>
      <ul className="dropdown-menu p-4 pt-2">
        {actions?.map(([itm, icon], i) => (
          <li key={i}>
            <button className="droplist d-flex align-items-center gap-2">
              <i className="material-symbols-outlined mat-icon">{icon}</i>
              <span>{itm}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactAction;
