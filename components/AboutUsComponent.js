import React, { Component } from 'react';
import { Card, Avatar, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, FlatList } from 'react-native';
import Loading from './LoadingComponent';

// redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        members: state.members
    }
};


class RenderIntroduce extends Component {
    render() {
        return (
            <Card>
                <Card.Title>Giới Thiệu Đồ Án</Card.Title>
                <Card.Divider />
                <Text style={{ fontSize: 15, margin: 10, justifyContent: 'center' }}>Project về ứng dụng đặt mua hàng điện thoại phía người dùng</Text>
                <Text style={{ fontSize: 15, margin: 10, justifyContent: 'center' }}>Ứng dụng được phát triển bởi Trầm Khôi Vĩ và Lê Duy Bảo </Text>
                <Text style={{ fontSize: 15, margin: 10, justifyContent: 'center' }}>Được xây dựng trên nền tản React Native</Text>
                <Text style={{ fontSize: 15, margin: 10, justifyContent: 'center' }}>Dữ liệu được lưu trữ trên server Heroku</Text>
            </Card>
        );
    }
}

class RenderInfomation extends Component {
    render() {
        if (this.props.isLoading) {
            return (
                <Card>
                    <Card.Title>Thông Tin Về Thành Viên</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            )
        }
        else if (this.props.errMess) {
            return (
                <Card>
                    <Card.Title>Thông Tin Về Thành Viên</Card.Title>
                    <Card.Divider />
                    <Text>{this.props.errMess}</Text>
                </Card>
            );
        }
        else {
            return (
                <Card>
                    <Card.Title>Thông Tin Về Thành Viên</Card.Title>
                    <Card.Divider />
                    <FlatList data={this.props.members}
                        renderItem={({ item, index }) => this.renderMemberItem(item, index)}
                        keyExtractor={item => item.id.toString()} />
                </Card>
            );
        }
    }
    renderMemberItem(item, index) {
        return (
            <ListItem key={index}>
                <Avatar rounded source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name} ({item.role})</ListItem.Title>
                    <ListItem.Subtitle>{item.major}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
}

class About extends Component {
    render() {
        return (
            <ScrollView>
                {/* <Loading /> */}
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <RenderIntroduce />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                    <RenderInfomation
                        members={this.props.members.members}
                        isLoading={this.props.members.isLoading}
                        errMess={this.props.members.errMess} />
                </Animatable.View>
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(About);
