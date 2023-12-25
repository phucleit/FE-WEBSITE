// material-ui
import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://itvungtau.com/" target="_blank" underline="hover">
      &copy; Thiết kế Website Vũng Tàu
    </Typography>
    <Typography variant="subtitle2" component={Link} href="http://thietkewebvungtau.net/" target="_blank" underline="hover">
      &copy; Thiết kế Website bởi IT Vũng Tàu
    </Typography>
  </Stack>
);

export default AuthFooter;
