import React from 'react';
import { TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import WriteHeader from '../components/WriteHeader'
import uuid from 'uuid/v1';

const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
            navigation.navigate('Write');
        }
    }
    
state = {
    inputtitle :'제목 입력', //우리가 WriteScreen에서 사용할 변하는 값은 title과 content
    inputcontent : '내용 입력',
}
_showTitle = (value) => { //todoApp을 만들때 했던것 처럼 changeText가 발생하면
    // console.log(value) //입력된 Text를 value로 받아와 setState로 state값을 변경시켜준다
    this.setState({inputtitle:value})
}
_showContent = (value) =>{
    // console.log(value)
    this.setState({inputcontent:value})
}
_gettoday = () => {
    //new Date를 이용해 날짜를 생성하고 get method를 이용해서 년,월,일을 뽑아왔습니다
    tyear = (new Date().getFullYear()).toString()
    tmonth = (new Date().getMonth() + 1).toString()
    tday = (new Date().getDate()).toString()
    // 우리의 Calendar Date형식에 맞춰 2019-9-5 가 아닌 2019-09-05 이렇게 뜨도록 해줍니다
    if (tmonth < 10) {
        tmonth = '0' + tmonth
    }
    if (tday < 10) {
        tday = '0' + tday
    }
    return (tyear + "-" + tmonth + "-" + tday)
    // console.log(tyear + "-" + tmonth + "-" + tday)
}
_saveText = () =>{ //글을 저장하는 함수
    if(this.state.inputtitle !== ''){ //입력된 제목이 존재하면
        const id = uuid() //id값은 uuid()를 통해서 만들어줍니다
        const date = "2019-12-28"// this._gettoday() //우리의 일기는 date값도 가지므로 메서드로 오늘의 date를 가져오겠습니다.
        const newpost = { //새로이 만들어질 일기객체를 생성합니다
            id : id, //id와 date는 위에서 가져온 값, title과 content는 state에서 가져옵니다
            title: this.state.inputtitle,
            content: this.state.inputcontent,
            date: date,
        }
        this.setState( //그리고 글이 저장되면 state의 값을 다시 비워줍시다
            {
                inputtitle: '',
                inputcontent: '',
            }
        )
        //WriteScreen에서 생성한 object를 띄워주기위해서는 MainScreen으로 값을 넘겨줘야합니다
        //따라서 Detail Screen을 구현할때 사용했던 navigate의 2번째 parameter를 이용해서 넘겨줍니다
        this.props.navigation.navigate('MainScreen',{myparam :newpost})
        // console.log(newPost)
    }
    else{
        //else는 제목이 비어있는 경우이므로 저장버튼을 눌러도 그냥 MainScreen으로 이동만 합니다
        this.props.navigation.navigate('MainScreen')
        // console.log("이건 else")
    }
}
    //오늘의 날짜를 불러오는 method입니다

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <WriteHeader saveProps={this._saveText} />
                    <TextInput
                        value = {this.state.inputtitle}
                        onChangeText = {this._showTitle}

                        placeholder="제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" /> 

                    <TextInput
                    value = {this.state.inputcontent}
                    onChangeText={this._showContent}

                    placeholder="내용을 입력하세요"
                    multiline={true} //여러줄에 걸친 입력이 가능합니다
                    style={styles.content}
                    returnKeyType="done" />
                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:30,
    },
    contentContainer: {
        width: width - 60,
    },
    title: {
        marginVertical: 30, //margin을 위 아래로 주는 속성입니다
        fontSize: 30,
        paddingBottom: 12,
        borderBottomWidth: 2,
    },
    content: {
        fontSize: 20,
    },
});