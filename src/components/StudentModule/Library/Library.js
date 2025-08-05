import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
const baseColor = '#0747a6';
import * as myConst from '../../Baseurl';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import moment from 'moment';
import { resW, typeMedium } from '../../../Utils/Constant';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisible: false,
      std_roll: '',
      dataSource: [],
      issueBookSource: [],
      heading: '',
      status: '',
      issueBookOriginalSource: [],
      active:true
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Dashboard');
    return true;
  };

  async componentDidMount() {
    let otherParam = null;
    if (this.props.route.params) {
      otherParam = this.props.route.params.otherParam;
      console.log('param-->', otherParam);
    }
    const value = await AsyncStorage.getItem('@std_roll');
    console.log('value-->>', value);
    this.setState({
      std_roll: value,
    });
    if (otherParam === 'Books') {
      this.setState({heading: 'Books'});
      this.libraryApi();
      this.libraryBookIssueApi()
    }
  }

  libraryBookIssueApi() {
    let formData = new FormData();
    formData.append('std_roll', this.state.std_roll);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'issueBook', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('issuebook>>', JSON.stringify(responseJson));
        if(responseJson.data != undefined){
        this.setState({
          issueBookSource: responseJson.data,
          issueBookOriginalSource: responseJson.data,
        });
      }
      })
      
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }


  libraryApi() {
    let formData = new FormData();
    formData.append('std_roll', this.state.std_roll);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'viewlibrary', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('library>>', responseJson);
        if(responseJson.data != undefined){
        this.setState({
          dataSource: responseJson.data,
          originalDataSource: responseJson.data,
        });
      }
      })
      
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  onSearch(text) {
    console.log('serach-->', JSON.stringify(this.state.originalDataSource));
    
    let filteredArr = this.state.originalDataSource.filter(object => {
      return object.title.toLowerCase().includes(text);
    });
    console.log('filter--->', filteredArr);
    this.setState({
      dataSource: text ? filteredArr : this.state.originalDataSource,
    });
  }

  toggleFunction() {
    this.setState(state => ({
      isVisible: !state.isVisible,
    }));
  }

  fn_IssueBook(){
    this.setState({
      active:true
    })
  }

  fn_LibraryBook(){
    this.setState({
      active:false
    })
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Header
          title={'Library'}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

                <View style={styles.buttonMainView}>
                    <Pressable style={this.state.active ? styles.buttonStyle : styles.buttonStyle2}  onPress={()=>this.fn_IssueBook()}  >
                        <Text style={this.state.active ? styles.buttonTextStyle : styles.buttonTextStyle2}>Issued Book</Text>
                    </Pressable>
                    <Pressable style={this.state.active ? styles.buttonStyle2 : styles.buttonStyle} onPress={()=>this.fn_LibraryBook()}  >
                        <Text style={this.state.active ? styles.buttonTextStyle2 : styles.buttonTextStyle}>Library Book</Text>
                    </Pressable>
                </View>
        {this.state.active ?
         
         <View >   
             <FlatList
               data={this.state.issueBookSource}
               renderItem={({item}) => (
                //  <View style={styles.FlatListView}>
                   <View style={styles.CardView}>
                     <View style={styles.CardViewStyle}>
                       {/* <View style={styles.DocImageAndTextStyle}> */}
                         <View style={styles.CircleShapeView}>
                           <Image
                             style={styles.AssignmentImage}
                             source={require('../../../assests/images/assignment.png')}
                           />
                         </View>
                         <View style={styles.TextViewStyle}>
                           <Text style={styles.DashboardTextStyle}>
                             {item?.book?.title}
                           </Text>
                           <View style = {{flexDirection:'row',alignItems:'center',marginTop:resW(1)}}>
                           <Text style={styles.DateText}>{moment(item?.issue?.issue_date).format('DD-MM-YYYY')}   </Text>
                           <View style={{width:resW(4),backgroundColor:'grey',height:resW(0.4),marginTop:resW(1)}} />
                           <Text style={styles.DateText}>   {moment(item?.issue?.return_date).format('DD-MM-YYYY')}</Text>
                           </View>
                           {item?.issue?.fine > 0 && <Text style={[styles.DateText,{color:'red',marginTop:resW(1),fontFamily:typeMedium}]}>Fine: {item?.issue?.fine}</Text>}

                         </View>
                       </View>
                     {/* </View> */}
                   </View>
                //  </View>
               )}
               keyExtractor={(item, index) => index}
               ItemSeparatorComponent={()=><View style={{height:resW(4)}} />}
               ListFooterComponent={()=><View style={{height:resW(4)}} />}
               ListHeaderComponent={()=><View style={{height:resW(1)}} />}

             />
          </View> 
          :
        <View >   
 
        {this.state.isVisible ? (
          <View style={{marginBottom:resW(3)}}>
          <Searchbar onChangeSearch={text => this.onSearch(text)} />
            </View>
        ) : null}

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            // <View style={styles.FlatListView}>
              <View style={styles.CardView}>
                <View style={styles.CardViewStyle}>
                  <View style={styles.DocImageAndTextStyle}>
                    <View style={styles.CircleShapeView}>
                      <Image
                        style={styles.AssignmentImage}
                        source={require('../../../assests/images/assignment.png')}
                      />
                    </View>
                    <View style={styles.TextViewStyle}>
                      <Text style={styles.DashboardTextStyle}>
                        {item?.title}
                      </Text>
                      <Text style={styles.DateText}>
                       Written by {item?.author_name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            // </View>
          )}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={()=><View style={{height:resW(4)}} />}
          ListFooterComponent={()=><View style={{height:resW(4)}} />}
        />
     </View>
   
    } 


       {!this.state.active && <View style={styles.FloatTabStyle}>
          <TouchableOpacity onPress={() => this.toggleFunction()}>
            <Image
              style={styles.FloatIconStyle}
              source={require('../../../assests/images/loupe_icon.png')}
            />
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}

export default Library;
