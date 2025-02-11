import { Avatar } from "@mui/material";
import { Chip } from "@mui/material";

const Header = () => {
  return (
    <main className="headerCon">
      <div>
        <img src="" alt="Outliers Logo" />
      </div>

      <div>
        <menu>
          <Chip label="Home" />
        </menu>
      </div>

      <div>
        <Avatar alt="User" src="" />
      </div>
    </main>
  );
};

export default Header;
