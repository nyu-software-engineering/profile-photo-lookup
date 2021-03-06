import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import YouTube from 'react-youtube';
import _ from "lodash";
import { SocialIcon } from 'react-social-icons';


const styles = theme => ({
    card: {
        maxWidth: 700,
        margin: "auto",
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 10
    },
    bio: {
        fontSize: 15
    },
    social: {
        textAlign: "center"
    },
    social_icon: {
        paddingLeft: 5,
        paddingRight: 10,
        display: "inline",
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        textDecoration: "underline",
        paddingBottom: 10,
        paddingTop: 15
    },
    actions: {
        display: "flex"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    content: {
        textTransform: "capitalize",
        fontSize: 15,
    }
});

const opts = {
    width: '100%',
    playerVars: {autoplay: 0}
};

class AthleteCard extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    _onReady(event) {
        event.target.pauseVideo();
    }

    renderPersonalLife() {
        const classes = this.props.classes;
        const celeb = this.props.celeb;
        return (
            <div>
                <Typography className={classes.heading}>
                    Personal Life
                </Typography>
                <Typography component="div">
                    {celeb.info['personal_life']}
                </Typography>
            </div>
        );
    }

    renderHighlights() {
        const classes = this.props.classes;
        const celeb = this.props.celeb;
            if (!_.isEmpty(celeb.info['highlights'])) {
            return (
                <div>
                    <Typography className={classes.heading}>
                        Highlights
                    </Typography>
                    <Typography component="div">
                        <YouTube
                          videoId={celeb.info.highlights}
                          opts={opts}
                          onReady={this._onReady}
                        />
                    </Typography>
                </div>
            );
        }
    }
    renderSocial() {
        const classes = this.props.classes;
        const celeb = this.props.celeb;
        const twitter = "http://twitter.com/" + celeb.info.twitter
        const instagram = "http://instagram.com/" + celeb.info.insta
        return (
            <div className={classes.social}>
                <div className={classes.social_icon}>
                    <SocialIcon url={twitter} />
                </div>
                <div className={classes.social_icon}>
                    <SocialIcon url={instagram} />
                </div>
            </div>
        ); 
    }


    render() {
        const classes = this.props.classes;
        const celeb = this.props.celeb;

        return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={celeb.info.image}
                title="Athlete"
            />
            <CardContent>
                <Typography className={classes.name}>
                    {celeb.name}
                </Typography>
                <Typography className={classes.bio}>
                    {celeb.info.bio}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
            {this.renderSocial()}
                <IconButton
                    className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {celeb.info.highlights ? this.renderHighlights() : null}
                    {celeb.info['personal_life'] ? this.renderPersonalLife() : null}
                </CardContent>
            </Collapse>
        </Card>
        );
    }
}

AthleteCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AthleteCard);
