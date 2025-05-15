import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView, BackHandler, Modal } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import SelectDropList from '../../SelectDropList';

const items = {
    item_name: '',
    quantity: '',
    cost: '',
    purpose: '',
    image: '',
    existing_stock: '',
    last_purchase: '',
    need_purchase: '',
    final_cost: '',
    isItemPurchased: false
}

class StaffAddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            options: [],
            itemOptions: [],
            itemDetailArr: [{ ...items }],
            fileName: '',
            fileUri: '',
            fileType: '',
            isVisiblPickerDialog: false,
            selectedValue: '',
            itemSelectedValue: '',
            role: '',
            date: '',
            id: '',
            justification: '',
            departmentItemIndex: '',
            itemNameItemIndex: '',
            deptArr: [],
            stockArr: [],
            deptHead: '',
            existingQuantity: '',
            cost: '',
            currentIndex: ''
        }
    }


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@id')
        const date = await AsyncStorage.getItem('@date')
        let myStr = date
        let firstWord = myStr.split(" ")[0]
        const teacherRole = await AsyncStorage.getItem('@role')
        this.setState({
            role: teacherRole,
            date: firstWord,
            id: value
        })
        this.getDepartmentApi()
        this.getStockApi()
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('StaffHome')
        return true;
    };


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    changeNumberQuantity = (value, index) => {
        console.log('value,', value)
        let itemDetailArr = this.state.itemDetailArr;
        itemDetailArr[index].quantity = value;
        // console.log('type',typeof(itemDetailArr[index].quantity))
        if (itemDetailArr[index].quantity && itemDetailArr[index].existing_stock) {
            if (Number(itemDetailArr[index].quantity) > Number(itemDetailArr[index].existing_stock)) {
                itemDetailArr[index].isItemPurchased = true;
                itemDetailArr[index].need_purchase = (itemDetailArr[index].quantity) - (itemDetailArr[index].existing_stock)
            } else {
                itemDetailArr[index].isItemPurchased = false;
                itemDetailArr[index].need_purchase = ''
                itemDetailArr[index].final_cost = ''
            }
        } else {
            itemDetailArr[index].isItemPurchased = false;
            itemDetailArr[index].need_purchase = ''
            itemDetailArr[index].final_cost = ''
        }
        this.setState({ itemDetailArr: itemDetailArr });
    }
    changeApproximateCost = (value, index) => {
        console.log('value,', value)
        let itemDetailArr = this.state.itemDetailArr;
        itemDetailArr[index].cost = value;
        if (Number(itemDetailArr[index].quantity) > Number(itemDetailArr[index].existing_stock)) {
            if (itemDetailArr[index].quantity && itemDetailArr[index].cost) {
                itemDetailArr[index].final_cost = (itemDetailArr[index].quantity) * (itemDetailArr[index].cost)
            }
        } else {
            itemDetailArr[index].isItemPurchased = false;
            itemDetailArr[index].need_purchase = ''
            itemDetailArr[index].final_cost = ''
        }
        this.setState({ itemDetailArr: itemDetailArr });
    }
    changePurpose = (value, index) => {
        console.log('value,', value)
        let itemDetailArr = this.state.itemDetailArr;
        itemDetailArr[index].purpose = value;
        this.setState({ itemDetailArr: itemDetailArr });
    }
    changeJustification = (justification) => {
        this.setState({ justification: justification });
    }


    getDepartmentApi() {
        let data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        this.setState({ isLoading: true });
        fetch(myConst.BASEURL + 'get_department', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->', responseJson.data)

                    let response = responseJson.data;
                    this.setState({
                        deptArr: response
                    })
                    console.log('deptArr-->', this.state.deptArr)
                    const departmentName = response.map(function (user) {
                        return user.dept_name;
                    });

                    console.log(departmentName);
                    let selectDepartment = ["Select Department"]
                    const departName = [...selectDepartment, ...departmentName];
                    console.log(departName)
                    this.setState({
                        options: departName
                    })

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    getStockApi() {
        let data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        this.setState({ isLoading: true });
        fetch(myConst.BASEURL + 'get_stock', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('StockResponse-->', responseJson.data)

                    let response = responseJson.data;
                    this.setState({
                        stockArr: response
                    })
                    console.log('stockArr-->', this.state.stockArr)

                    const itemName = response.map(function (user) {
                        return user.item_name;
                    });

                    console.log(itemName);
                    let selectItemName = ["Select Item Name"]
                    const itemsName = [...selectItemName, ...itemName];
                    console.log(itemsName)
                    this.setState({
                        itemOptions: itemsName
                    })

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    uploadImageApi(index) {
        console.log('called', index)
        this.setState({ isLoading: true });
        let formData = new FormData()
        formData.append('file', { uri: this.state.fileUri, name: this.state.fileName, type: this.state.fileType })
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        this.setState({ isLoading: true });
        fetch('http://139.59.90.236:84/api/' + 'purposeimage', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    this.setState({ isLoading: false });

                    const image = responseJson.image;
                    let itemDetailArr = this.state.itemDetailArr;
                    itemDetailArr[index].image = image;
                    this.setState({ itemDetailArr: itemDetailArr });

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    addItemQueryApi() {
        var itemArr = this.state.itemDetailArr;
        delete (itemArr["isItemPurchased"]);
        console.log(typeof (this.state.itemDetailArr))
        let formData = new FormData()
        formData.append('id', this.state.id)
        formData.append('item', this.state.itemDetailArr)
        formData.append('justification', this.state.justification)
        formData.append('department', this.state.selectedValue)
        formData.append('department_head', this.state.deptHead)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
            },
            // body: formData
            body: JSON.stringify({
                'id': this.state.id,
                'item': JSON.stringify(this.state.itemDetailArr),
                'justification': this.state.justification,
                'department': this.state.selectedValue,
                'department_head': this.state.deptHead
            })
        }
        this.setState({ isLoading: true });
        fetch(myConst.BASEURL + 'add_item', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->', responseJson)
                    this.props.navigation.navigate("StaffHome")

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    addItemDetailBox() {

        const arr = [...this.state.itemDetailArr]
        arr.push({ ...items })
        this.setState({
            itemDetailArr: arr
        })
        setTimeout(() => {
            console.log(this.state.itemDetailArr)
        }, 1000)
    }


    removeItemDetailBox(index) {
        console.log(this.state.itemDetailArr)
        const arr = this.state.itemDetailArr
        arr.splice(index, 1)
        this.setState({
            itemDetailArr: arr
        })
    }


    selectFile = (type) => {
        const options = {
            mediaType: 'photo',
            videoQuality: 'high',
            quality: 1,
            maxWidth: 0,
            maxHeight: 0,
            includeBase64: false,
            cameraType: 'back',
            selectionLimit: 1,
            saveToPhotos: false,
            durationLimit: 0,
        };
        if (type === 'Gallery') {

            launchImageLibrary(options, (response) => {
                try {
                    console.log(response);
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].uri);
                    console.log(response.assets[0].type);
                    this.setState({
                        fileName: response.assets[0].fileName,
                        fileUri: response.assets[0].uri,
                        fileType: response.assets[0].type
                    });
                    this.uploadImageApi(this.state.currentIndex)
                    console.log('fileeee---->>>>>>>>>', this.state.fileUri)
                } catch (error) {
                    console.log(error)
                }
            })
            this.setState({ isVisiblPickerDialog: false })

        } else if (type === 'Camera') {
            launchCamera(options, (response) => {
                try {
                    console.log(response);
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].uri);
                    console.log(response.assets[0].type);
                    this.setState({
                        fileName: response.assets[0].fileName,
                        fileUri: response.assets[0].uri,
                        fileType: response.assets[0].type
                    });
                    this.uploadImageApi(this.state.currentIndex)
                    console.log('fnameeee---->>>>>>>>>', this.state.fileUri)
                } catch (error) {
                    console.log(error)
                }
            })
            this.setState({ isVisiblPickerDialog: false })


        }
    }



    changeDepartment(o) {
        this.setState(o, () => {
            const { selectedValue, departmentItemIndex } = this.state;
            // console.log('deptArr =>', JSON.stringify(this.state.deptArr), this.state.selectedValue, this.state.departmentItemIndex)
            let filteredArr = this.state.deptArr.filter(object => {
                return object.id === this.state.departmentItemIndex;
            })

            try {
                if (filteredArr !== null) {
                    // console.log('filter--->', filteredArr);
                    const head = filteredArr[0].dept_head;
                    this.setState({
                        deptHead: head
                    })
                }
            } catch (error) {

            }
        });

    }


    changeStock(o) {
        this.setState(o, () => {
            console.log(o)
            const { itemSelectedValue, itemNameItemIndex } = this.state;
            // console.log('stockArr =>', JSON.stringify(this.state.stockArr), this.state.itemSelectedValue, this.state.itemNameItemIndex)
            let filteredArr = this.state.stockArr.filter(object => {
                return object.id === this.state.itemNameItemIndex;
            })

            let itemDetailArr = this.state.itemDetailArr;
            itemDetailArr[o.index].item_name = itemSelectedValue;
            this.setState({ itemDetailArr: itemDetailArr });

            try {
                if (filteredArr !== null) {
                    // console.log('filter--->', filteredArr);
                    const quantity = filteredArr[0].quantity;
                    const cost = filteredArr[0].cost;
                    itemDetailArr[o.index].existing_stock = quantity;
                    itemDetailArr[o.index].last_purchase = cost;
                    // this.setState({
                    //     existingQuantity: quantity,
                    //     cost: cost
                    // })
                }
            } catch (error) {

            }
        });

    }



    onOpenImageDialog(index) {
        console.log('index', index)
        this.setState({
            currentIndex: index
        })
        this.setState({ isVisiblPickerDialog: true })
    }



    resetData() {
        this.setState({
            itemDetailArr: [{
                item_name: '',
                quantity: '',
                cost: '',
                purpose: '',
                image: '',
                existing_stock: '',
                last_purchase: '',
                need_purchase: '',
                final_cost: '',
                isItemPurchased: false
            }],
            justification: '',
            options: ['Select Department'],
            deptHead: ''
        })
    }


    render() {
        const { isVisiblPickerDialog } = this.state;
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Add Items</Text>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("StaffViewItemQuery")}>
                                <Image style={styles.HeaderArrowImage}
                                    source={require('../../../assests/images/project.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.ContainerStyle}>
                        <Text style={styles.HeadingText}>Date</Text>
                        <View style={styles.rowIconStyle}>
                            <Text style={styles.TextInputStyle}>{this.state.date}</Text>
                            <Image style={styles.ImageStyle}
                                source={require('../../../assests/images/Date.png')} />
                        </View>

                        <Text style={styles.HeadingText}>Person who require's the items(s)</Text>
                        <View style={styles.rowIconStyle}>
                            <Text style={styles.TextInputStyle}>{this.state.role}</Text>
                            <Image style={styles.ImageStyle}
                                source={require('../../../assests/images/Person.png')} />
                        </View>

                        <Text style={styles.HeadingText}>Department who require's the items(s)</Text>
                        <View style={styles.rowIconStyle}>
                            <View style={styles.DropDownBackground}>
                                {/* <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.selectedValue}

                                    onValueChange={(itemValue, itemIndex) => {
                                        this.changeDepartment({ selectedValue: itemValue, departmentItemIndex: itemIndex })
                                    }
                                    }>
                                    {this.state.options.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />)
                                    })}
                                </Picker> */}

                   {this.state.options.length > 0 && <SelectDropList 
                        list={this.state.options}
                        title={this.state.selectedValue === '' ? 'Select Department' : this.state.selectedValue}
                        buttonExt={styles.dropList}
                        textExt={styles.dropListText}
                        type={1}
                        on_Select={(d)=>this.setState({
                            selectedValue: d
                        })}
                        />}
                            </View>

                            <Image style={styles.ImageStyle}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </View>

                        <View style={styles.RowStyle}>
                            <Text style={styles.DetailItemHeadingText}>Details of the Items:</Text>
                            <Image style={styles.DetailImageStyle}
                                source={require('../../../assests/images/Items.png')} />
                        </View>

                        {
                            this.state.itemDetailArr.length && this.state.itemDetailArr.map((val, index) => {
                                return (
                                    <View style={styles.itemDetailBox}>

                                        {this.state.itemDetailArr.length !== 1 && <TouchableOpacity onPress={() => this.removeItemDetailBox(index)}>
                                            <Image style={styles.removeImageStyle}
                                                source={require('../../../assests/images/remove.png')} />
                                        </TouchableOpacity>}
                                        <Text style={styles.HeadingText}>Name of the item to be purchased</Text>

                                        <View style={styles.rowIconStyle}>
                                            <View style={styles.DropDownBackground}>
                                                {/* <Picker
                                                    mode='dropdown'
                                                    selectedValue={val.item_name}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        this.changeStock({ itemSelectedValue: itemValue, itemNameItemIndex: itemIndex, index })
                                                    }
                                                    }>
                                                    {this.state.itemOptions.map((item, index) => {
                                                        return (<Picker.Item label={item} value={item} key={index} />)
                                                    })}
                                                </Picker> */}
                                                {this.state.itemOptions.length > 0 && <SelectDropList
                                                    list={this.state.itemOptions}
                                                    title={val?.item_name === '' ? 'Select Item Name' : val?.item_name}
                                                    buttonExt={styles.dropList}
                                                    textExt={styles.dropListText}
                                                    type={1}
                                                    on_Select={(d,i) =>
                                                        this.changeStock({ itemSelectedValue: d, itemNameItemIndex: i, index })

                                                    }
                                                />}
                                                
                                            </View>
                                        </View>

                                        <Text style={styles.HeadingText}>Number Quantity</Text>
                                        <View style={styles.rowIconStyle}>
                                            <TextInput style={styles.DetailItemTextInputStyle}
                                                keyboardType='numeric'
                                                value={val.quantity}
                                                onChangeText={(val) => this.changeNumberQuantity(val, index)}
                                            >
                                            </TextInput>
                                            <Image style={styles.ImageStyle}
                                                source={require('../../../assests/images/Quantity.png')} />
                                        </View>

                                        <Text style={styles.HeadingText}>Approximate Cost RS</Text>
                                        <View style={styles.rowIconStyle}>
                                            <TextInput style={styles.DetailItemTextInputStyle}
                                                keyboardType='numeric'
                                                value={val.cost}
                                                onChangeText={(val) => this.changeApproximateCost(val, index)}
                                            ></TextInput>
                                            <Image style={styles.ImageStyle}
                                                source={require('../../../assests/images/Cost.png')} />
                                        </View>

                                        <Text style={styles.HeadingText}>Purpose</Text>
                                        <View style={styles.rowIconStyle}>
                                            <TextInput
                                                style={styles.DetailItemTextInputStyle}
                                                value={val.purpose}
                                                onChangeText={(val) => this.changePurpose(val, index)}
                                            ></TextInput>
                                            <Image style={styles.ImageStyle}
                                                source={require('../../../assests/images/Purpose.png')} />
                                        </View>

                                        <Text style={styles.HeadingText}>Purpose Image</Text>

                                        <View style={styles.ChooseFileBoxStyle}>
                                            <Text style={styles.SelectFileText}>{val.image}</Text>
                                            <TouchableOpacity
                                               style={styles.chooseFileButton2}
                                                onPress={() => this.onOpenImageDialog(index)}
                                            >
                                                <Text style={styles.chooseFileButton}>Choose File</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={styles.HeadingText}>The existing quantity in stock</Text>
                                        <Text style={styles.TextInputWithBox}>{val.existing_stock}</Text>

                                        <Text style={styles.HeadingText}>The rate at which it was purchased</Text>
                                        <Text style={styles.TextInputWithBox}>{val.last_purchase}</Text>


                                        {val.isItemPurchased && (
                                            <>
                                                <Text style={styles.HeadingText}>Item need to be purchased</Text>
                                                <Text style={styles.TextInputWithBox}>{val.need_purchase}</Text>

                                                <Text style={styles.HeadingText}>Final cost</Text>
                                                <Text style={styles.TextInputWithBox}>{val.final_cost}</Text>
                                            </>
                                        )
                                        }
                                    </View>
                                )
                            })
                        }

                        <TouchableOpacity onPress={() => this.addItemDetailBox()}>
                            <Text style={styles.addMoreText}>Add More</Text>
                        </TouchableOpacity>

                        <Text style={styles.HeadingText}>Justification</Text>

                        <View style={styles.RowStyle}>
                            <TextInput
                                multiline={true}
                                placeholder='Enter justification..'
                                placeholderTextColor='grey'
                                value={this.state.justification}
                                onChangeText={this.changeJustification}
                                style={styles.DescriptionBoxStyle}></TextInput>
                        </View>

                        <Text style={styles.HeadingText}>Recommendation of Departmental Head Person (Who is submitting this performa)</Text>
                        <Text style={styles.TextInputWithBox}>{this.state.deptHead}</Text>

                        <View style={styles.ButtonContainerStyle}>
                            <TouchableOpacity style={styles.button}
                                onPress={() => this.addItemQueryApi()}
                            >
                                <Text style={styles.buttonText}>SAVE</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}
                                onPress={() => this.resetData()}
                            >
                                <Text style={styles.buttonText}>RESET</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal animationType="slide"
                        transparent visible={isVisiblPickerDialog}
                        presentationStyle="overFullScreen">
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => this.selectFile('Camera')}>
                                    <Text style={styles.modalText}>Choose from Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectFile('Gallery')}>
                                    <Text style={styles.modalText}>Pick from Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ isVisiblPickerDialog: false })}>
                                    <Text style={styles.CancelButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        )
    }

}

export default StaffAddItem;