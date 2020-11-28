import DagreGraph from 'dagre-d3-react'

import styles from "./QueryVisualizer.module.css"

const QueryVisualizer = (props) => {

  const nodes = [];
  const links = [];

  const getData = () => {
    console.log(props);
    if (props.data && "nodes" in props.data && "links" in props.data) {
      props.data["nodes"].forEach((node) => {
        nodes.push({ id: node.id, label: node.node_type, class: `${styles.queryNode}` });
      })

      props.data["links"].forEach((link) => {
        links.push({ source: link.source, target: link.target, class: `${styles.queryLink}` });
      })
    }
    else {
      return null;
    }
  }

  return (
    getData() !== null ? 
    <DagreGraph
      nodes={nodes}
      links={links}
      config={{
        rankdir: 'TB',
        align: 'DL',
        ranker: 'tight-tree'
      }}
      width='100%'
      height='100%'
      animate={1000}
      shape='rect'
      fitBoundaries
      zoomable
      onNodeClick={e => console.log(e)}
      onRelationshipClick={e => console.log(e)}>
    </DagreGraph > : "Test"
  )
}

export default QueryVisualizer;