
import React, { useEffect, useState } from 'react';
import G6 from '@antv/g6';
import insertCss from 'insert-css';
insertCss(`
  .g6-component-tooltip {
    background-color: rgba(0,0,0, 0.65);
    padding: 10px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    width: fit-content;
    color: #fff;
    border-radius = 4px;
  }
`);
export default function AntvG6(props) {
    let mockData = {
        id: '',
        isDepartment: true,
        name: "暂无数据",
        rate: 1,
        security: 'B',
        children: [{
            depth: 1,
            id: "62ede0825848f3ee95c21661",
            isDepartment: true,
            name: "暂无子数据",
            rate: 1,
            security: "B",
            children:[{
                    "name": "192-168-1-44",
                    "partVulnsName": "未修复",
                    "partVulnsValue": 122,
                    "vulnsName": "所有漏洞",
                    "vulnsValue": 122,
                    "rate": 0,
                    "security": 5,
                    "x": 600,
                    "y": 0,
                    "depth": 2,
                    "type": "flow-rect",
                    "id": "node-0.94898048482868451660048470539",
                    "style": {
                        "active": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 2,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10
                        },
                        "selected": {
                            "fill": "rgb(255, 255, 255)",
                            "stroke": "rgb(95, 149, 255)",
                            "lineWidth": 4,
                            "shadowColor": "rgb(95, 149, 255)",
                            "shadowBlur": 10,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "highlight": {
                            "fill": "rgb(223, 234, 255)",
                            "stroke": "#4572d9",
                            "lineWidth": 2,
                            "text-shape": {
                                "fontWeight": 500
                            }
                        },
                        "inactive": {
                            "fill": "rgb(247, 250, 255)",
                            "stroke": "rgb(191, 213, 255)",
                            "lineWidth": 1
                        },
                        "disable": {
                            "fill": "rgb(250, 250, 250)",
                            "stroke": "rgb(224, 224, 224)",
                            "lineWidth": 1
                        }
                    }
                }
            ],
        }]
    }
    useEffect(() => {
        const colors = {
            B: '#0077CC',
            5: '#E92E2E',
            4: '#FE7800',
            3: '#FCBD23',
            2: '#FE7800',
            1: '#36A424',
        };
        //  组件props
        const prop = {
            data: mockData,
            config: {
                padding: [20, 50],
                defaultLevel: 3,
                defaultZoom: 0.8,
                modes: { default: ['zoom-canvas', 'drag-canvas'] },
            },
        };
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        // const height = container.scrollHeight || 500;
        const height = 500;

        // 默认配置
        const defaultConfig = {
            width,
            height,
            modes: {
                default: ['zoom-canvas', 'drag-canvas'],
            },
            fitView: true,
            animate: true,
            defaultNode: {
                type: 'flow-rect',
            },
            defaultEdge: {
                type: 'cubic-horizontal',
                style: {
                    stroke: '#CED4D9',
                },
            },
            layout: {
                type: 'indented',
                direction: 'LR',
                dropCap: false,
                indent: 300,
                getHeight: () => {
                    return 60;
                },
            },
        };

        // 自定义节点、边
        const registerFn = () => {
            /**
             * 自定义节点
             */
            G6.registerNode(
                'flow-rect',
                {
                    shapeType: 'flow-rect',
                    draw(cfg, group) {
                        const {
                            name = '',
                            vulnsName,
                            vulnsValue,
                            variableUp,
                            partVulnsValue,
                            collapsed,
                            partVulnsName,
                            security,
                            rate,
                            isDepartment
                        } = cfg;

                        const grey = '#CED4D9';
                        const rectConfig = {
                            width: 220,
                            height: 60,
                            lineWidth: 1,
                            fontSize: 12,
                            fill: '#fff',
                            radius: 4,
                            stroke: grey,
                            opacity: 1,
                        };

                        const nodeOrigin = {
                            x: -rectConfig.width / 2,
                            y: -rectConfig.height / 2,
                        };

                        const textConfig = {
                            textAlign: 'left',
                            textBaseline: 'bottom',
                        };

                        const rect = group.addShape('rect', {
                            attrs: {
                                x: nodeOrigin.x,
                                y: nodeOrigin.y,
                                ...rectConfig,
                            },
                        });

                        const rectBBox = rect.getBBox();

                        group.addShape('text', {
                            attrs: {
                                ...textConfig,
                                x: isDepartment ? 30 + nodeOrigin.x : 12 + nodeOrigin.x,
                                y: isDepartment ? 40 + nodeOrigin.y : 23 + nodeOrigin.y,
                                // x: 12 + nodeOrigin.x,
                                // y: 20 + nodeOrigin.y,
                                text: isDepartment && name.length > 8 ? name.substr(0, 10) + '...' : (!isDepartment && name.length > 28 ? name.substr(0, 30) + '...' : name),
                                fontSize: isDepartment ? 20 : 10,
                                opacity: 0.85,
                                fill: '#000',
                                cursor: 'pointer',
                            },
                            name: 'name-shape',
                        });
                        // price
                        const price = group.addShape('text', {
                            attrs: {
                                ...textConfig,
                                x: 12 + nodeOrigin.x,
                                y: rectBBox.maxY - 10,
                                text: partVulnsValue,
                                fontSize: 20,
                                fill: security ? colors[security] : '#000',
                                opacity: 0.85,
                            },
                        });

                        // label partVulnsName
                        group.addShape('text', {
                            attrs: {
                                ...textConfig,
                                x: price.getBBox().maxX + 5,
                                y: rectBBox.maxY - 12,
                                text: partVulnsName,
                                fontSize: 12,
                                fill: '#000',
                                opacity: 0.9,
                            },
                        });

                        // percentage
                        const percentText = group.addShape('text', {
                            attrs: {
                                ...textConfig,
                                x: rectBBox.maxX - 16,
                                y: rectBBox.maxY - 12,
                                // text: `${((vulnsValue || 0) * 100).toFixed(2)}%`,
                                text: vulnsValue,
                                fontSize: 12,
                                textAlign: 'right',
                                fill: '#0077CC',
                            },
                        });

                        // percentage triangle
                        const symbol = variableUp ? 'triangle' : 'triangle-down';
                        const triangle = group.addShape('marker', {
                            attrs: {
                                ...textConfig,
                                x: percentText.getBBox().minX - 10,
                                y: rectBBox.maxY - 12 - 6,
                                symbol,
                                r: 6,
                                fill: colors[security],
                                opacity: 0
                            },
                        });

                        // variable name
                        group.addShape('text', {
                            attrs: {
                                ...textConfig,
                                x: triangle.getBBox().minX + 10,
                                y: rectBBox.maxY - 12,
                                text: vulnsName,
                                fontSize: 12,
                                textAlign: 'right',
                                fill: '#000',
                                opacity: 0.9,
                            },
                        });

                        // bottom line background
                        const bottomBackRect = group.addShape('rect', {
                            attrs: {
                                x: nodeOrigin.x,
                                y: rectBBox.maxY - 4,
                                width: rectConfig.width,
                                height: 4,
                                radius: [0, 0, rectConfig.radius, rectConfig.radius],
                                fill: '#E0DFE3',
                            },
                        });

                        // bottom percent
                        const bottomRect = group.addShape('rect', {
                            attrs: {
                                x: nodeOrigin.x,
                                y: rectBBox.maxY - 4,
                                width: rate * rectBBox.width,
                                height: 4,
                                radius: [0, 0, 0, rectConfig.radius],
                                fill: colors[security],
                            },
                        });

                        // collapse rect
                        if (cfg.children && cfg.children.length) {
                            group.addShape('rect', {
                                attrs: {
                                    x: rectConfig.width / 2 - 8,
                                    y: -8,
                                    width: 16,
                                    height: 16,
                                    stroke: 'rgba(0, 0, 0, 0.25)',
                                    cursor: 'pointer',
                                    fill: '#fff',
                                },
                                name: 'collapse-back',
                                modelId: cfg.id,
                            });

                            // collpase text
                            group.addShape('text', {
                                attrs: {
                                    x: rectConfig.width / 2,
                                    y: -1,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                    text: collapsed ? '+' : '-',
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    fill: 'rgba(0, 0, 0, 0.25)',
                                },
                                name: 'collapse-text',
                                modelId: cfg.id,
                            });
                        }

                        this.drawLinkPoints(cfg, group);
                        return rect;
                    },
                    update(cfg, item) {
                        const { level, security, name } = cfg;
                        const group = item.getContainer();
                        let mask = group.find(ele => ele.get('name') === 'mask-shape');
                        let maskLabel = group.find(ele => ele.get('name') === 'mask-label-shape');
                        if (level === 0) {
                            group.get('children').forEach(child => {
                                if (child.get('name')?.includes('collapse')) return;
                                child.hide();
                            })
                            if (!mask) {
                                mask = group.addShape('rect', {
                                    attrs: {
                                        x: -101,
                                        y: -30,
                                        width: 202,
                                        height: 60,
                                        opacity: 0,
                                        fill: colors[security]
                                    },
                                    name: 'mask-shape',
                                });
                                maskLabel = group.addShape('text', {
                                    attrs: {
                                        fill: '#fff',
                                        fontSize: 20,
                                        x: 0,
                                        y: 10,
                                        text: name.length > 28 ? name.substr(0, 16) + '...' : name,
                                        textAlign: 'center',
                                        opacity: 0,
                                    },
                                    name: 'mask-label-shape',
                                });
                                const collapseRect = group.find(ele => ele.get('name') === 'collapse-back');
                                const collapseText = group.find(ele => ele.get('name') === 'collapse-text');
                                collapseRect?.toFront();
                                collapseText?.toFront();
                            } else {
                                mask.show();
                                maskLabel.show();
                            }
                            mask.animate({ opacity: 1 }, 200);
                            maskLabel.animate({ opacity: 1 }, 200);
                            return mask;
                        } else {
                            group.get('children').forEach(child => {
                                if (child.get('name')?.includes('collapse')) return;
                                child.show();
                            })
                            mask?.animate({ opacity: 0 }, {
                                duration: 200,
                                callback: () => mask.hide()
                            });
                            maskLabel?.animate({ opacity: 0 }, {
                                duration: 200,
                                callback: () => maskLabel.hide()
                            });
                        }
                        this.updateLinkPoints(cfg, group);
                    },
                    setState(name, value, item) {
                        if (name === 'collapse') {
                            const group = item.getContainer();
                            const collapseText = group.find((e) => e.get('name') === 'collapse-text');
                            if (collapseText) {
                                if (!value) {
                                    collapseText.attr({
                                        text: '-',
                                    });
                                } else {
                                    collapseText.attr({
                                        text: '+',
                                    });
                                }
                            }
                        }
                    },
                    getAnchorPoints() {
                        return [
                            [0, 0.5],
                            [1, 0.5],
                        ];
                    },
                },
                'rect',
            );

            G6.registerEdge(
                'flow-cubic',
                {
                    getControlPoints(cfg) {
                        let controlPoints = cfg.controlPoints; // 指定controlPoints
                        if (!controlPoints || !controlPoints.length) {
                            const { startPoint, endPoint, sourceNode, targetNode } = cfg;
                            const { x: startX, y: startY, coefficientX, coefficientY } = sourceNode
                                ? sourceNode.getModel()
                                : startPoint;
                            const { x: endX, y: endY } = targetNode ? targetNode.getModel() : endPoint;
                            let curveStart = (endX - startX) * coefficientX;
                            let curveEnd = (endY - startY) * coefficientY;
                            curveStart = curveStart > 40 ? 40 : curveStart;
                            curveEnd = curveEnd < -30 ? curveEnd : -30;
                            controlPoints = [
                                { x: startPoint.x + curveStart, y: startPoint.y },
                                { x: endPoint.x + curveEnd, y: endPoint.y },
                            ];
                        }
                        return controlPoints;
                    },
                    getPath(points) {
                        const path = [];
                        path.push(['M', points[0].x, points[0].y]);
                        path.push([
                            'C',
                            points[1].x,
                            points[1].y,
                            points[2].x,
                            points[2].y,
                            points[3].x,
                            points[3].y,
                        ]);
                        return path;
                    },
                },
                'single-line',
            );
        };

        registerFn();

        const { data } = prop;
        let graph = null;

        const initGraph = (data) => {
            if (!data) {
                return;
            }
            const { onInit, config } = prop;
            const tooltip = new G6.Tooltip({
                // offsetX and offsetY include the padding of the parent container
                offsetX: 20,
                offsetY: 30,
                // the types of items that allow the tooltip show up
                // 允许出现 tooltip 的 item 类型
                itemTypes: ['node'],
                // custom the tooltip's content
                // 自定义 tooltip 内容
                getContent: (e) => {
                    const outDiv = document.createElement('div');
                    //outDiv.style.padding = '0px 0px 20px 0px';
                    const nodeName = e.item.getModel().name;
                    let formatedNodeName = '';
                    for (let i = 0; i < nodeName.length; i++) {
                        formatedNodeName = `${formatedNodeName}${nodeName[i]}`;
                        if (i !== 0 && i % 20 === 0) formatedNodeName = `${formatedNodeName}<br/>`;
                    }
                    outDiv.innerHTML = `${formatedNodeName}`;
                    return outDiv;
                },
                shouldBegin: (e) => {
                    if (e.target.get('name') === 'name-shape' || e.target.get('name') === 'mask-label-shape') return true;
                    return false;
                },
            });
            graph = new G6.TreeGraph({
                container: 'container',
                ...defaultConfig,
                ...config,
                plugins: [tooltip],
            });
            if (typeof onInit === 'function') {
                onInit(graph);
            }
            graph.data(data);
            graph.render();
            const handleCollapse = (e) => {
                const target = e.target;
                const id = target.get('modelId');
                const item = graph.findById(id);
                const nodeModel = item.getModel();
                nodeModel.collapsed = !nodeModel.collapsed;
                graph.layout();
                graph.setItemState(item, 'collapse', nodeModel.collapsed);
            };
            graph.on('collapse-text:click', (e) => {
                handleCollapse(e);
            });
            graph.on('collapse-back:click', (e) => {
                handleCollapse(e);
            });
            // 监听画布缩放，缩小到一定程度，节点显示缩略样式
            // let currentLevel = 1;
            // const briefZoomThreshold = Math.max(graph.getZoom(), 0.5);
            // graph.on('viewportchange', e => {
            //     if (e.action !== 'zoom') return;
            //     const currentZoom = graph.getZoom();
            //     let toLevel = currentLevel;
            //     if (currentZoom < briefZoomThreshold) {
            //         toLevel = 0;
            //     } else {
            //         toLevel = 1;
            //     }
            //     if (toLevel !== currentLevel) {
            //         currentLevel = toLevel;
            //         graph.getNodes().forEach(node => {
            //             graph.updateItem(node, {
            //                 level: toLevel
            //             })
            //         })
            //     }
            // });
        };

        initGraph(data);

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                // graph.changeSize(container.scrollWidth, container.scrollHeight);
                graph.changeSize(container.scrollWidth, 500);
            };
    }, []);
    return <div id={'container'}></div>;
};
