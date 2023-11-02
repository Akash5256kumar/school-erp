import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import styles from './style';
import AsyncStorage from "@react-native-community/async-storage";


class StaffViewItemQueryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            department: '',
            dept_head: '',
            approved_person: '',
            justification: '',
            approval_date: '',

        }
    }


    async componentDidMount() {
        const myObject = await AsyncStorage.getItem('@MySuperStore:key');
        if (myObject !== null) {
            // console.log(JSON.parse(myObject));
            const itemObject = (JSON.parse(myObject))
            const dataSource = []
            for(let i=0;i< JSON.parse(itemObject.item_name).length; i++){
                let item = {
                    itemName: JSON.parse(itemObject.item_name)[i],
                    quantity: JSON.parse(itemObject.quantity)[i],
                    cost: JSON.parse(itemObject.cost)[i],
                    purpose: JSON.parse(itemObject.purpose)[i],
                    purposeImage: JSON.parse(itemObject.purpose_image)[i],
                }
                console.log('item', item)
                dataSource.push(item);
            }

            this.setState({
                dataSource: dataSource,
                department: itemObject.department,
                dept_head: itemObject.department_head,
                approved_person: itemObject.approved_person,
                justification: itemObject.justification,
                approval_date: itemObject.approval_date
    
            })
        }
        
        console.log('data', this.state.dataSource)
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Requisition Form Details</Text>
                        <View></View>
                    </View>
                </View>

                <ScrollView>
                    <Text style={styles.DetailText}>Details of the items:</Text>
                    <View style={styles.RowStyle}>
                        <Text style={styles.TextColor}>Purpose Image</Text>
                        <Text style={styles.TextColor}>Name of the item to be purchased</Text>
                        <Text style={styles.TextColor}>Number Quantity</Text>
                        <Text style={styles.TextColor}>Approximate Cost Rs.</Text>
                        <Text style={styles.TextColor}>Purpose</Text>
                    </View>

                    <FlatList
                        data={this.state.dataSource}

                        renderItem={({ item }) =>
                            <View style={styles.FlatListView}>
                                <View style={styles.CardView}>

                                    <View style={styles.TopRowStyle}>
                                        <Image style={styles.ViewMoreImage}
                                            source={{uri: "http://139.59.90.236:84/images/" + item.purposeImage}} />
                                        <Text style={styles.FlatlistText}>{item.itemName}</Text>
                                        <Text style={styles.FlatlistText}>{item.quantity}</Text>
                                        <Text style={styles.FlatlistText}>{item.cost}</Text>
                                        <Text style={styles.FlatlistText}>{item.purpose}</Text>
                                    </View>

                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                    />

                    <View style={styles.CardViewStyle}>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Department who requires the items(s):</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.department}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Recommendation of Department Head Person</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.dept_head}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Person who requires the items(s):</Text></View>
                            <View><Text style={styles.TextRight}></Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Item Request Date:</Text></View>
                            <View><Text style={styles.TextRight}></Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Person who approved the items(s):</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.approved_person}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Approval Date:</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.approval_date}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Admin approval Date:</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.approval_date}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>justification:</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.justification}</Text></View>
                        </View>

                    </View>
                </ScrollView>
            </View>

        )
    }
}

export default StaffViewItemQueryDetails;