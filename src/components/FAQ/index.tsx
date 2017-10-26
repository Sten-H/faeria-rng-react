import * as React from 'react';
import { Card, CardHeader, CardTitle, CardBody, Col, Row } from 'reactstrap';
import { map, addIndex } from 'ramda';
import './FAQ.css';
import { faq } from './data.json';

const createQuestion = (q: string) => ( <p className="question">{q}</p> );
const createAnswer = (a: string) => ( <p className="answer">{a}</p> );
const createPair  = (qa: QuestionAnswer, i: number) =>
    ( <div key={i}>{createQuestion(qa.q)}{createAnswer(qa.a)}</div> );
// QuestionAnswer[] -> <div>[]
const createAllPairs = addIndex(map)(createPair);

export const FAQ = () => {
    return (
        <Card className="faq mt-5" color="info" outline>
            <CardHeader>
                <CardTitle className="my-0">
                    FAQ
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Col sm={12}>
                    <Row>
                    <Col xs={12} lg={6}>
                        <h5>Draw calculation</h5>
                        {createAllPairs(faq.draw)}
                    </Col>
                    <Col xs={12} lg={6}>
                        <h5>Ping calculation</h5>
                        {createAllPairs(faq.ping)}
                    </Col>
                    </Row>
                </Col>
            </CardBody>
        </Card>
    );
};
export default FAQ;