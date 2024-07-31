import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

type MenuButtonProps = {
  background?: string;
};

export const MenuButton = styled(Button)<MenuButtonProps>(({ background, theme }) => ({
  minWidth: "110px",
  fontWeight: 700,
  boxShadow: "0 0 0 2px #054b62, 4px 4px 0 0 #054B62",
  borderRadius: "2px",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: "#fffff",
  background: background || theme.palette.primary.main,
}));
