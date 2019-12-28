import React from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars';
import DetailHeader from '../components/DetailHeader'
import WriteHeader from '../components/WriteHeader'

export default class MainScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='calendar-multiselect' size={25} style={{ color: tintColor }} />
        )
    }
    constructor(props){
        super(props)
        this.state = {
            selectedDate: '',
            Posts: [{
                title: '8월 30일에 쓴 글',
                content: '본문',
                id: 1,
                date: '2019-08-30',
            },
            {
                title: '8월 29일에 쓴 글',
                content: '본문',
                id: 2,
                date: '2019-08-29',
            },
            ]
        }
    }
    state = {
        selectedDate :'',
        Posts:[
        {
            title : '8월 30일에 쓴 글',
            content: '본문',
            date : '2019-08-30',
        },
        {
            title: '8월 29일에 쓴 글',
            content: '본문',
            date: '2019-08-29',
        },
        ]
    }
    
    componentDidMount(){ //React의 life cycle에서 Mount 된 이후에 실행하라는 의미입니
        this.props.navigation.addListener( //addListener를 통해 Event를 추가해줍니다
        'didFocus', //이 screen(현재 Main)이 focus되면
        payload => { //payload란 data중에서도 관심이 잇는 부분을 말한다
                    //payload 대신 ()라고 작성해 주셔도 됩니다 익명함수로
                    //myparam이라는 이름으로 WriteScreen에서 넘겨줬으니 getParam으로 잡아줍시다
            newpost = this.props.navigation.getParam('myparam')
            
            if (newpost ) { //넘어온 newpost가 있으면 if문이 true가 되고 실행됩니다
                const PrevPosts = [...this.state.Posts] //todo App에서 했던것처럼 ...(spread operator)를 이용해줍니다
                this.setState({ Posts: PrevPosts.concat(newpost) } ) //이전 일기와 새로운 일기를 concat으로 연결!
                this.props.navigation.navigate('MainScreen',{myparam: false })
            } //일기가 추가되고 나면 다시금 MainScreen으로 myparam이란 이름의 false 값을 넘겨줍시다
        }
    )
    }

    render(){
        return (
            console.log(this.state.selectedDate), //제대로 찍히고 있는지 확인하기 위한용도입니다
            <SafeAreaView style={styles.container}>
                <Calendar
                    onDayPress={(day) => { this.setState(this.state.selectedDate = day)} }
                    current={new Date()}/>
                <ScrollView>
                    <FlatList
                    data ={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
                    renderItem ={({item, index})=>{
                        return (
                            <TouchableOpacity
                            onPress={() => {this.props.navigation.navigate('Detail',{post:item})}}
                            style = {styles.listitem}>
                            <View>
                                <Text style = {styles.listtext}>
                                    제목 : {item.title}
                                </Text>
                                <Text style={styles.listtext}>
                                    내용 : {item.content}
                                </Text>
                            </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor = {(item, index) => {return `$(index)`}} />
                </ScrollView>
            </SafeAreaView>
        );
    }    
}

const styles = StyleSheet.create({
    listitem:{
        marginLeft:50,
        marginTop:20,
        borderLeftColor: "black",
        borderLeftWidth: 4,
        paddingLeft:30,
    },
    container: {
        flex: 1,
        paddingTop:20,
        backgroundColor: 'red',
    },
    textstyle:{
        fontSize:80,
    },
    listtext:{
        fontSize : 20,
    }
});
