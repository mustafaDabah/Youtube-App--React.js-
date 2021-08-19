import { useStateValue } from '../ContextAPI/globalState';
import {makeStyles  , Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        btnSubscribe:{
            color:'#ff0000',
            padding:theme.spacing(2),
        },
        btnUnSubscribe:{
            padding:theme.spacing(2),
            color:theme.palette.primary
        }
    }
})

function BtnSubscribe({details}) {
    const classes = useStyles();
    const {setSubscribes , untSubscribes , subscribes} = useStateValue();

    // change btn to unsubscribes 
    const subscribesStore = subscribes.find(channel => channel.id === details.id);
    const subscribesDisable = subscribesStore ? true : false 

    const addSubscribe = () => {
        setSubscribes(details);
    }

    const deleteSubscribe = () => {
        untSubscribes(details.id);
    }

    return (
        <div>
            {subscribesDisable ? (
                <Button className={classes.btnUnSubscribe} onClick={deleteSubscribe}>unsubscribe</Button>
            ) : (
                <Button className={classes.btnSubscribe} onClick={addSubscribe}>subscribe</Button>
            )}
        </div>
    )
}

export default BtnSubscribe
