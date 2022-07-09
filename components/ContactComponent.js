import React, { Component } from 'react'
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Thông Tin Liên Hệ</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>123, Nguyễn Văn Tráng, Tp Hồ Chí Minh</Text>
                    <Text style={{ margin: 10 }}>VIỆT NAM</Text>
                    <Text style={{ margin: 10 }}>Tel: +84 012 345 6789</Text>
                    <Text style={{ margin: 10 }}>Fax: +84 789 123 1230</Text>
                    <Text style={{ margin: 10 }}>Email: bao.ld5702@sinhvien.hoasen.edu.vn</Text>
                    <Text style={{ margin: 10 }}>Email: vi.tk2044@sinhvien.hoasen.edu.vn</Text>
                    <Card.Divider />
                    <Button title='Gửi phản hồi cho chúng tôi' buttonStyle={{ backgroundColor: '#7cc' }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' style={{marginRight:10}} />}
                        onPress={this.composeMail} />
                </Card>
            </Animatable.View>
        )
    }
    composeMail() {
        MailComposer.composeAsync({
          recipients: ['bao.ld5702@sinhvien.hoasen.edu.vn','vi.tk2044@sinhvien.hoasen.edu.vn'],
          subject: 'Phản hồi của khách hàng',
          body: 'Hello my friends ...'
        });
      }
}

export default Contact