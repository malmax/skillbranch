import React from 'react';

import importcss from 'importcss';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import Component from 'lsk-general/General/Component';
import Header from '../../components/Header';
import PostCard from '../../components/PostCard';

@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header siteTitle={this.props.siteTitle} />
        <Grid styleName="content">
          <Row>
            <Col xs={12} md={4}>
              <Card>
                <CardBlock>
                  <CardTitle>Категории</CardTitle>
                  <Nav bsStyle="pills" stacked activeKey={1}>
                    <NavItem eventKey={1}>NavItem 1 content</NavItem>
                    <NavItem eventKey={2}>NavItem 2 content</NavItem>
                    <NavItem eventKey={3}>NavItem 3-before-define content</NavItem>
                  </Nav>
                </CardBlock>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <PostCard>
                <PostCard.Head
                  _id={1}
                  name="Максим"
                  surname="Малахов"
                  date={new Date('2016-01-12')}
                  git="https://github.com/malmax/skillbranch"
                />
              </PostCard>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
