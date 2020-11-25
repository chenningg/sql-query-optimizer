import { useState } from 'react';
import axios from "axios";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const FormInput = () => {
  const [input, setInput] = useState({
    "query": "",
    "predicates": [],
    "selectivity": 50,
  });
  const [output, setOutput] = useState({
    "output": "",
    "explanation": [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setOutput("Generating output...")

    if (input.query !== "") {
      axios.post("/generate", input)
      .then((response) => {
        setOutput({"output": response.data.output, "explanation": response.data.explanation });
      })
      .catch((error) => {
        setOutput({ ...output, "output": "ERROR: Please ensure that your SQL query is executable." });
      })
    }
    else {
      setOutput({ ...output, "output": "ERROR: Please input an SQL query."});
    }
    
  }

  const handleChecked = (event) => {
    setInput(oldState => {
      const index = oldState.predicates.indexOf(event.target.id);

      if (event.target.checked) {
        if (index <= -1) {
          oldState.predicates.push(event.target.id)
        }
      }
      else {
        if (index > -1) {
          oldState.predicates.splice(index, 1);
        }
      }

      return (oldState);
    });
  }

  const handleSelectivityChange = (event) => {
    setInput({ ...input, "selectivity": event.target.value });
  }

  const resetForm = (event) => {
    setInput({
      "query": "",
      "predicates": [],
      "selectivity": 50,
    });
    setOutput({
      "output": "",
      "explanation": [],
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Row>
          <Form.Group as={Col} controlId="formOptions">
            <Form.Group controlId="formSelectivity">
              <Form.Label>Selectivity</Form.Label>
              <Row>
                <Col xs={10}>
                  <Form.Control onChange={handleSelectivityChange} type="range" value={input.selectivity} className="w-80" custom />
                </Col>
                <Col>
                  <Form.Control className="w-20 inline-block" value={`${input.selectivity}%`} readOnly />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPredicates">
              <Form.Label>Predicates</Form.Label>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                    Region
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {["r_regionkey", "r_name", "r_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                    Nation
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      {["n_nationkey", "n_name", "n_regionkey", "n_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                    Supplier
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      {["s_suppkey", "s_name", "s_address", "s_nationkey", "s_phone", "s_acctbal", "s_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                    Customer
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      {["c_custkey", "c_name", "c_address", "c_nationkey", "c_phone", "c_acctbal", "c_mktsegment", "c_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                    Part
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>
                      {["p_partkey", "p_name", "p_mfgr", "p_brand", "p_type", "p_size", "p_container", "p_retailprice", "p_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
                    PartSupp
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="5">
                    <Card.Body>
                      {["ps_partkey", "ps_suppkey", "ps_availqty", "ps_supplycost", "ps_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
                    Orders
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="6">
                    <Card.Body>
                      {["o_orderkey", "o_custkey", "o_orderstatus", "o_totalprice", "o_orderdate", "o_orderpriority", "o_clerk", "o_shippriority", "o_comment"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
                    LineItem
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="7">
                    <Card.Body>
                      {["l_orderkey", "l_partkey", "l_suppkey", "l_linenumber", "l_quantity", "l_extendedprice", "l_discount", "l_tax", "l_returnflag", "l_linestatus", "l_shipdate", "l_commitdate", "l_receiptdate", "l_shipinstruct", "l_shipmode"].map((type) => (
                        <Form.Check
                          type="checkbox" key={type} id={type} label={type} onClick={handleChecked} />
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Form.Group>
          </Form.Group>
            
          <Form.Group as={Col} controlId="formQuery">
            <Form.Label>SQL Query</Form.Label>
            <Form.Control as="textarea" rows="19" placeholder="Input SQL query..." onChange={event => setInput({...input, "query": event.target.value})} value={input.query} />
          
            <Row>
              <Col>
                <Button onClick={ resetForm } variant="secondary" type="reset" className="w-100 mt-3">
                Reset
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                Generate
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form.Row>
      </Form>

      <Form.Row>
        <Form.Group as={Col} controlId="formOutput">
          <Form.Label>Output</Form.Label>
          <Form.Control as="textarea" rows="25" value={JSON.stringify(output.output, null, 2)} readOnly />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formExplanation">
          <Form.Label>Explanation</Form.Label>
        </Form.Group>
      </Form.Row>
    </>
  )
}
      
export default FormInput;