import React from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import ShieldStar from "./icons/ShieldStar";
import Truck from "./icons/Truck";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
});



const useStyles = makeStyles({

    card: {
        backgroundColor: (card) => {
            if (card.seen === true){
                return '#FFF6A5'
            }
        }
    },
    cardMedia: {
        paddingTop: "95.25%" // 16:9
    },
    oldPrice: {
        textDecoration: 'line-through',
        paddingLeft: 8,
    },
    gridCity: {
      paddingTop: 12,
    },
    cityTitle: {
        fontSize: 12,
    },
    productNameTitle: {
        fontSize: 14,
    },
    price: {
        paddingLeft: 14,
    },
    cardImage: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: '30%',
        zIndex: 5,
        fontSize: 9,
        fontColor: '#'
    },
    imageIcon: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 25,
        right: 5

    },
    hoverIcon: {
        "&:hover": {
            color: '#00A0AB'
        }
    },



});


function NoteCard({card}) {
    const classes = useStyles(card);
    const timestamp = card.date
    console.log(timestamp)

    const formatDate = (timestamp) => {
       const date = new Date(timestamp * 1000)
       const year = date.getFullYear();
       const month = ('0' + (date.getMonth() + 1))
       const day = ( '0' + (date.getDay() + 1));
       const hours = date.getHours();
       const minutes = "0" + date.getMinutes();
       const seconds = "0" + date.getSeconds();
       return  `${year} ${month} ${day} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
    }

    return (
        <ThemeProvider theme={customTheme}>
            <Card className={classes.card} elevation={1}>

                <div className={classes.cardImage}>
                    {card.seen === true ?
                    <Button className={classes.badge} color="primary" >
                        Просмотрено
                        </Button> : ''}
                    <CardMedia className={classes.cardMedia}
                               image='https://source.unsplash.com/random'
                               title="some kind of image"
                    />

                    <div className={classes.imageIcon} >
                        <BarChartRoundedIcon className={classes.hoverIcon} color="primary" />
                        <FavoriteIcon className={classes.hoverIcon} color="primary"/>
                    </div>
                </div>



                    <CardActions className={classes.cardActions} >
                        <Typography className={classes.oldPrice} variant="subtitle2" align="left" color="textSecondary">
                            {card.oldPrice}&nbsp;&#8381;
                        </Typography>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Grid item>
                                <Truck className={classes.hoverIcon}  color="disabled" fontSize="small"/>
                            </Grid>
                            <Grid item>
                                <ShieldStar className={classes.hoverIcon}  color="disabled" fontSize="small"/>
                            </Grid>
                        </Grid>
                    </CardActions>


                <Typography variant="h6"  className={classes.price}>
                    {card.price}&nbsp;&#8381;
                </Typography>
                <CardContent  >
                <Typography className={classes.productNameTitle} variant="h5" >
                    {card.title}
                </Typography>
                    <Grid
                        className={classes.gridCity}
                        container
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Grid item >
                            <Typography  className={classes.cityTitle}  color="textSecondary">
                                {card.locality}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography  className={classes.cityTitle}  color="textSecondary">
                                {formatDate(timestamp)}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
    </ThemeProvider>
    )
}

export default NoteCard
