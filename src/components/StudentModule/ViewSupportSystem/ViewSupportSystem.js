import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler, Pressable, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import * as constant from '../../../Utils/Constant'
import LinearGradient from 'react-native-linear-gradient';


class ViewSupportSystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            dataSource: [],
            pendingData: [],
            assignedData: [],
            solvedData: [],
            listShow:false,
            filterTitle:"Pending"
        }

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home')
        return true;
    };


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@std_roll')
        console.log('value-->>', value)
        this.setState({
            std_roll: value
        })
        this.viewSupportApi();
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    buttonClicked(type) {
        if (type === 'pending') {
            this.setState({
                dataSource: this.state.pendingData,
                listShow:false,
                filterTitle:"Pending"
            })
        } else if (type === 'assigned') {
            this.setState({
                dataSource: this.state.assignedData,
                listShow:false,
                filterTitle:'Assigned'
            })
        } else if (type === 'solved') {
            this.setState({
                dataSource: this.state.solvedData,
                listShow:false,
                filterTitle:"Solved"
            })
        }
    }


    async viewMoreButton(item){
        await AsyncStorage.setItem('@id', String(item.id))
        await AsyncStorage.setItem('@issue', item.issue)
        this.props.navigation.navigate('ViewMoreSupportSystem')
    }


    viewSupportApi() {
        let formData = new FormData()
        formData.append('admission_no', this.state.std_roll)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewsupport2', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('data-->', responseJson)
                if (responseJson.status === true) {
                    this.setState({
                        dataSource: responseJson.pending,
                        pendingData: responseJson.pending,
                        assignedData: responseJson.assigned,
                        solvedData: responseJson.solved
                    })
                    // this.showMessage(responseJson.message)
                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

 fn_Header(){
    return(
        <View style={[styles.mainView,]}>
          <Pressable style={styles.leftMainView} onPress={()=>this.props.navigation.navigate('Home')}>
          <Image source={constant.Icons.backArrowIcon} resizeMode='contain' style={styles.backIcon} />
          </Pressable>
          <View style={styles.midMainView}>
            <Text style={styles.titleStyle}>View Support</Text>
          </View>
          <View style={styles.rightMainView}>
          <LinearGradient colors={constant.LinearGradientColor} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={[styles.LinearmainView]}>
   <Pressable style={styles.button} onPress={()=>this.setState({listShow:true})}>
    <Text style={styles.buttonTitle}>{this.state.filterTitle}</Text>
    <Image source={constant.Icons.filterIcon} style={styles.filterIcon} />
    </Pressable>  
    </LinearGradient>

          </View>
        </View>
    )
 }


    render() {
        return (
            <LinearGradient colors={['#DFE6FF','#ffffff']} style={{flex:1,}} >
           {this.fn_Header()}   
           <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.MainContainer}>
                    
                <FlatList
                    data={this.state.dataSource}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <Pressable style={styles.TextViewStyle} onPress={() => this.viewMoreButton(item)}>
                                    <View style={styles.FirstRowStyle}>
                                        {/* <Text style={styles.DashboardTextStyle}>{item.title}</Text> */}
                                        <Text style={styles.DateText}>{item.issue}</Text>
                                    <Text style={styles.DateText2}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                                    </View>
                                 
                                    <View>
                                            <Image style={{ height:constant.resW(6.5),width:constant.resW(6.5)}}
                                                source={constant.Icons.newsEyeIcon} />
                                        </View>
                                        
                                </Pressable>
                    }
                    ListFooterComponent={()=>{return(<View style={{height:constant.resW(25)}} />)}}

                    keyExtractor={(item, index) => index}
                />

            </View>
            </ScrollView>
{this.state.listShow &&
         <Pressable style={styles.listOutView} onPress={()=>this.setState({listShow:false})}> 
        <View style={styles.listMainView}>
        <Pressable style={styles.listButton} onPress={()=> this.buttonClicked('pending')}>
            <Image source={constant.Icons.pending}  style={styles.listIcon} />
            <Text style={styles.listText}>Pending</Text>
        </Pressable>
        <Pressable style={styles.listButton} onPress={()=> this.buttonClicked('assigned')}>
        <Image source={constant.Icons.complain_assignment}  style={styles.listIcon} />
            <Text style={styles.listText}>Assigned</Text>
        </Pressable>
        <Pressable style={[styles.listButton,{borderBottomWidth:0}]} onPress={()=> this.buttonClicked('solved')}>
        <Image source={constant.Icons.solved}  style={styles.listIcon} />
            <Text style={styles.listText}>Solved</Text>
        </Pressable>
    </View>
    </Pressable>
    }
            </LinearGradient>
        )
    }

}

export default ViewSupportSystem;