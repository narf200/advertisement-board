import React, {useState, useEffect} from "react";
import {
    Grid,
    Container,
    makeStyles,
    Typography, Button
} from "@material-ui/core";
import NoteCard from "./NoteCard";
import {KeyboardArrowDown} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({

    header: {
        paddingLeft: 33,
        fontSize: 22,
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
    gridItem: {
        height:368,
        width: 224,
    },
    moreButton: {
        marginLeft: 760,
        color: '#00A0AB'

    }
}));


function Cards() {
    const classes = useStyles();

    const [cards, setCards] = useState([]);
    const [showCards, setShowCards] = useState(15);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        fetch('https://6075786f0baf7c0017fa64ce.mockapi.io/products')
            .then(res => res.json())
            .then(data => {
                setIsPending(false)
                setCards(data)
            })

    })

    const loadMore = () => ( showCards === 15 ? setShowCards(cards.length) : setShowCards(15) )

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography className={classes.header}  variant="h6" align="left" color="textPrimary" >
                Похожие объявления
            </Typography>
            <Grid className={classes.root}
                  container
                  spacing={2}
            >
                {isPending && <div>Loading...</div>}
                {cards.map((card, id) => (
                    id <= showCards ? <Grid  item key={card.id}   xs={12} sm={6} md={4} lg={3} >
                        <NoteCard className={classes.gridItem} card={card}/>
                    </Grid> : ''
                ))}
            </Grid>
            <Button
                onClick={(id, cards)=> loadMore(id, cards)}
                className={classes.moreButton}
                endIcon={<KeyboardArrowDown/>}
            >Показать ещё</Button>
        </Container>
    )
}

export default Cards
