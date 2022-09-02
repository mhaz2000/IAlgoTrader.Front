import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { faEdit, faChartColumn, faAt, faGear, faClock, faDollar } from '@fortawesome/free-solid-svg-icons';

interface AlgoNode {
  name: string;
  children?: AlgoNode[];
  route: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  route: string;
}


const TREE_DATA: AlgoNode[] = [
  {
    route: '',
    name: 'الگوریتم ها',
    children: [
      { name: 'میانگین موزون حجم قیمت', route: 'vwap' },
      { name: 'میانگین موزون زمان قیمت ', route: 'twap' },
      { name: 'درصد حجمی', route: 'pov' }
    ],
  }
];


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  chartBar = faChartColumn;
  edit = faEdit;
  at = faAt;
  gear = faGear;
  clock = faClock;
  dollar = faDollar

  private _transformer = (node: AlgoNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      route: node.route
    };
  };

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
