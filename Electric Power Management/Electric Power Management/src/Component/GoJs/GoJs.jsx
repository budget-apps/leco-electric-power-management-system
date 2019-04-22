import React, {Component} from 'react';
import go from 'gojs';
const goObj = go.GraphObject.make;

export default class GoJs extends Component {
    constructor (props) {
        super (props);

        this.renderCanvas = this.renderCanvas.bind (this);

        this.state = {myModel: null, myDiagram: null}
    }


    renderCanvas () {
        let model = goObj (go.GraphLinksModel);
        let diagram = goObj (
            go.Diagram,
            this.refs.goJsDiv,
            {
                initialContentAlignment: go.Spot.Center,
                mouseWheelBehavior : go.ToolManager.WheelZoom,
            });

        // define the Node template
        diagram.nodeTemplate =
            goObj(go.Node, "Auto",
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                // define the node's outer shape, which will surround the TextBlock
                goObj(go.Shape, "RoundedRectangle",
                    {
                        parameter1: 12,  // the corner has a large radius
                        fill: goObj(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                        stroke: null,
                        portId: "",  // this Shape is the Node's port, not the whole Node
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer",
                        toEndSegmentLength: 50, fromEndSegmentLength: 40,

                    }),
                goObj(go.TextBlock,
                    {
                        font: "bold 13pt helvetica, bold arial, sans-serif",
                        editable: true,  // editing the text automatically updates the model data,
                    },
                    new go.Binding("text").makeTwoWay())
            );

        // replace the default Link template in the linkTemplateMap
        diagram.linkTemplate =
            goObj(go.Link,  // the whole link panel
                {
                    curve: go.Link.Bezier, adjusting: go.Link.Stretch,
                    reshapable: true, relinkableFrom: true, relinkableTo: true,
                    toShortLength: 3,
                },
                new go.Binding("points").makeTwoWay(),
                new go.Binding("curviness"),
                goObj(go.Shape,  // the link shape
                    { strokeWidth: 1.5 }),
                goObj(go.Shape,  // the arrowhead
                    { toArrow: "standard", stroke: null }),
                goObj(go.Panel, "Auto",
                    goObj(go.Shape,  // the label background, which becomes transparent around the edges
                        {
                            fill: goObj(go.Brush, "Radial",
                                { 0: "rgb(255, 255, 255)", 0.3: "rgb(255, 255, 255)", 1: "rgba(255, 255, 255, 0)" }),
                            stroke: null
                        }),
                    goObj(go.TextBlock, "transition",  // the label text
                        {
                            textAlign: "center",
                            font: "9pt helvetica, arial, sans-serif",
                            margin: 4,
                            editable: true  // enable in-place editing
                        },
                        // editing the text automatically updates the model data
                        new go.Binding("text").makeTwoWay())
                )
            );


        this.setState({myModel: model, myDiagram: diagram},
            () => {
                model.nodeDataArray = this.props.nodes;
                model.linkDataArray = this.props.links;
                diagram.model = model;

                this.setState({myModel: model, myDiagram: diagram});
            }
        );
    }

    componentDidMount () {
        this.renderCanvas ();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.nodes !== nextProps.nodes) {
            console.log ('Updating');
            const model = this.state.myModel;
            const diagram = this.state.myDiagram;
            model.nodeDataArray = this.props.nodes;
            model.linkDataArray = this.props.links
            diagram.model = model;
            this.setState({myModel: model, myDiagram: diagram});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.nodes!==this.props.nodes
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.nodes !== nextProps.nodes) {
            console.log ('Updating');
            const model = this.state.myModel;
            const diagram = this.state.myDiagram;
            model.nodeDataArray = this.props.nodes;
            model.linkDataArray = this.props.links
            diagram.model = model;
            this.setState({myModel: model, myDiagram: diagram});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate")
        if (this.props.nodes !== prevProps.nodes) {
            console.log ('Updating');
            const model = this.state.myModel;
            const diagram = this.state.myDiagram;
            model.nodeDataArray = this.props.nodes;
            model.linkDataArray = this.props.links
            diagram.model = model;
            this.setState({myModel: model, myDiagram: diagram});
        }
    }

    render () {
        return <div ref="goJsDiv" style={{'width': '100%', 'height': '500px', 'backgroundColor': '#00000'}}></div>;
    }
}

// GoJs.propTypes = { data: React.PropTypes.string.isRequired };
// GoJs.defaultProps = { data: '[]' };
