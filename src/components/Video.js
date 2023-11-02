import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, BackHandler
} from 'react-native';
const baseColor = '#0747a6'
import YoutubePlayer from 'react-native-youtube-iframe';


class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoId: ''
        }
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack()
        return true;
    };


    componentDidMount(){
        const { otherParam } = this.props.route.params;
        console.log('param-->', otherParam);
        // this.setState({ videouri: otherParam })
        var arr = otherParam.split('/')
        this.setState({ videoId: arr[arr.length-1] })
        console.log(this.state.videoId)
    }


    render() {
        return (
            <View>
                <YoutubePlayer
                    height={500}
                    play={true}
                    videoId={this.state.videoId}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },

    video: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200,
    }

});


export default Video;