import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
      display: 'flexbox',
      flexDirection: 'row-reverse'
        
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        paddingTop: '100px',
        width: '140px',
        height: '160px',
      },
      main: {
        paddingTop: '100px'
      },
}));