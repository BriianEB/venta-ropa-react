import { alpha } from '@mui/material/styles';


const MuiCard = {
    styleOverrides: {
        root: function ({ theme }) {
            const color = theme.palette.grey[500];

            return {
                boxShadow: `0 0 25px 0 ${alpha(color, 0.15)}`
            };
        }
    }
};

export default MuiCard;