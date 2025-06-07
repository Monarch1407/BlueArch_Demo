import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Grid, List, Eye, Download, Share2, Layers, MousePointer, Move, Type, Square } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface WireframeComponent {
  id: string;
  type: 'header' | 'sidebar' | 'content' | 'card' | 'button' | 'input' | 'table' | 'chart';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  annotations?: string[];
}

interface Wireframe {
  id: string;
  name: string;
  description: string;
  device: 'desktop' | 'tablet' | 'mobile';
  page_type: 'dashboard' | 'form' | 'list' | 'detail' | 'landing';
  components: WireframeComponent[];
  created_at: string;
  updated_at: string;
}

const mockWireframes: Wireframe[] = [
  {
    id: '1',
    name: 'Student Dashboard - Desktop',
    description: 'Main dashboard layout for student portal with navigation, stats, and quick actions',
    device: 'desktop',
    page_type: 'dashboard',
    components: [
      {
        id: 'header-1',
        type: 'header',
        x: 0,
        y: 0,
        width: 1200,
        height: 64,
        label: 'Header Navigation',
        annotations: ['Logo placement: 16px from left', 'User menu: 16px from right', 'Search bar: center-aligned']
      },
      {
        id: 'sidebar-1',
        type: 'sidebar',
        x: 0,
        y: 64,
        width: 256,
        height: 736,
        label: 'Main Navigation',
        annotations: ['Fixed width: 256px', 'Collapsible on mobile', 'TIMA Cyborg widget at bottom']
      },
      {
        id: 'content-1',
        type: 'content',
        x: 256,
        y: 64,
        width: 944,
        height: 736,
        label: 'Main Content Area',
        annotations: ['Responsive grid layout', 'Max-width: 1200px', 'Padding: 24px']
      }
    ],
    created_at: '2024-12-01',
    updated_at: '2024-12-10'
  },
  {
    id: '2',
    name: 'Attendance Form - Mobile',
    description: 'Mobile-optimized attendance marking interface with biometric integration',
    device: 'mobile',
    page_type: 'form',
    components: [
      {
        id: 'header-2',
        type: 'header',
        x: 0,
        y: 0,
        width: 375,
        height: 56,
        label: 'Mobile Header',
        annotations: ['Hamburger menu: left', 'Page title: center', 'Actions: right']
      },
      {
        id: 'content-2',
        type: 'content',
        x: 0,
        y: 56,
        width: 375,
        height: 667,
        label: 'Form Content',
        annotations: ['Single column layout', 'Touch-friendly buttons: min 44px', 'Biometric scanner UI']
      }
    ],
    created_at: '2024-12-02',
    updated_at: '2024-12-09'
  },
  {
    id: '3',
    name: 'Timetable Grid - Tablet',
    description: 'Interactive timetable with drag-drop functionality for tablet devices',
    device: 'tablet',
    page_type: 'list',
    components: [
      {
        id: 'header-3',
        type: 'header',
        x: 0,
        y: 0,
        width: 768,
        height: 60,
        label: 'Tablet Header',
        annotations: ['Adaptive navigation', 'Class selector dropdown', 'Export options']
      },
      {
        id: 'table-1',
        type: 'table',
        x: 24,
        y: 84,
        width: 720,
        height: 500,
        label: 'Timetable Grid',
        annotations: ['Horizontal scroll on overflow', 'Color-coded periods', 'Touch gestures for editing']
      }
    ],
    created_at: '2024-12-03',
    updated_at: '2024-12-08'
  }
];

const WireframeCanvas: React.FC<{ wireframe: Wireframe }> = ({ wireframe }) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  
  const getDeviceDimensions = () => {
    switch (wireframe.device) {
      case 'desktop': return { width: 1200, height: 800 };
      case 'tablet': return { width: 768, height: 1024 };
      case 'mobile': return { width: 375, height: 667 };
      default: return { width: 1200, height: 800 };
    }
  };

  const getComponentColor = (type: string) => {
    const colors = {
      header: '#3B82F6',
      sidebar: '#10B981',
      content: '#F3F4F6',
      card: '#E5E7EB',
      button: '#8B5CF6',
      input: '#F59E0B',
      table: '#EF4444',
      chart: '#06B6D4'
    };
    return colors[type as keyof typeof colors] || '#6B7280';
  };

  const dimensions = getDeviceDimensions();
  const scale = Math.min(800 / dimensions.width, 600 / dimensions.height);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{wireframe.name}</h3>
          <p className="text-sm text-gray-600">{wireframe.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {dimensions.width} × {dimensions.height}px
          </span>
          <div className="flex items-center space-x-1">
            {wireframe.device === 'desktop' && <Monitor className="w-4 h-4 text-gray-400" />}
            {wireframe.device === 'tablet' && <Tablet className="w-4 h-4 text-gray-400" />}
            {wireframe.device === 'mobile' && <Smartphone className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
      </div>
      
      <div className="relative bg-gray-50 rounded border-2 border-dashed border-gray-300 overflow-hidden">
        <svg
          width="100%"
          height="400"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="block"
        >
          {/* Device Frame */}
          <rect
            x="0"
            y="0"
            width={dimensions.width}
            height={dimensions.height}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          
          {/* Components */}
          {wireframe.components.map((component) => (
            <g key={component.id}>
              <rect
                x={component.x}
                y={component.y}
                width={component.width}
                height={component.height}
                fill={getComponentColor(component.type)}
                fillOpacity={selectedComponent === component.id ? 0.8 : 0.6}
                stroke={selectedComponent === component.id ? '#1F2937' : '#9CA3AF'}
                strokeWidth={selectedComponent === component.id ? 2 : 1}
                className="cursor-pointer transition-all"
                onClick={() => setSelectedComponent(component.id)}
              />
              
              {/* Component Label */}
              <text
                x={component.x + component.width / 2}
                y={component.y + component.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-gray-700 pointer-events-none"
              >
                {component.label}
              </text>
              
              {/* Dimensions */}
              {selectedComponent === component.id && (
                <>
                  <text
                    x={component.x + component.width / 2}
                    y={component.y - 8}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 font-mono"
                  >
                    {component.width}px
                  </text>
                  <text
                    x={component.x - 8}
                    y={component.y + component.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-gray-600 font-mono"
                    transform={`rotate(-90, ${component.x - 8}, ${component.y + component.height / 2})`}
                  >
                    {component.height}px
                  </text>
                </>
              )}
            </g>
          ))}
          
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Component Details */}
      {selectedComponent && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          {(() => {
            const component = wireframe.components.find(c => c.id === selectedComponent);
            if (!component) return null;
            
            return (
              <div>
                <h4 className="font-medium text-blue-900 mb-2">{component.label}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-blue-700">Position:</span>
                    <span className="ml-2 font-mono">{component.x}, {component.y}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Size:</span>
                    <span className="ml-2 font-mono">{component.width} × {component.height}</span>
                  </div>
                </div>
                {component.annotations && (
                  <div>
                    <span className="text-blue-700 text-sm font-medium">Annotations:</span>
                    <ul className="mt-1 space-y-1">
                      {component.annotations.map((annotation, index) => (
                        <li key={index} className="text-sm text-blue-800 flex items-start">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {annotation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

const WireframeCard: React.FC<{ wireframe: Wireframe; onView: (wireframe: Wireframe) => void }> = ({ 
  wireframe, 
  onView 
}) => {
  const getDeviceIcon = () => {
    switch (wireframe.device) {
      case 'desktop': return <Monitor className="w-5 h-5 text-blue-500" />;
      case 'tablet': return <Tablet className="w-5 h-5 text-green-500" />;
      case 'mobile': return <Smartphone className="w-5 h-5 text-purple-500" />;
    }
  };

  const getPageTypeColor = (type: string) => {
    const colors = {
      dashboard: 'bg-blue-100 text-blue-800',
      form: 'bg-green-100 text-green-800',
      list: 'bg-purple-100 text-purple-800',
      detail: 'bg-orange-100 text-orange-800',
      landing: 'bg-teal-100 text-teal-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onView(wireframe)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getDeviceIcon()}
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPageTypeColor(wireframe.page_type)}`}>
                {wireframe.page_type}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{wireframe.name}</h3>
            <p className="text-sm text-gray-600">{wireframe.description}</p>
          </div>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-600">Device</p>
            <p className="font-medium capitalize">{wireframe.device}</p>
          </div>
          <div>
            <p className="text-gray-600">Components</p>
            <p className="font-medium">{wireframe.components.length} elements</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Updated: {new Date(wireframe.updated_at).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const WireframePage: React.FC = () => {
  const [wireframes] = useState<Wireframe[]>(mockWireframes);
  const [selectedWireframe, setSelectedWireframe] = useState<Wireframe | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'canvas'>('grid');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [pageTypeFilter, setPageTypeFilter] = useState('all');

  const filteredWireframes = wireframes.filter(wireframe => {
    const matchesDevice = deviceFilter === 'all' || wireframe.device === deviceFilter;
    const matchesPageType = pageTypeFilter === 'all' || wireframe.page_type === pageTypeFilter;
    return matchesDevice && matchesPageType;
  });

  const handleViewWireframe = (wireframe: Wireframe) => {
    setSelectedWireframe(wireframe);
    setViewMode('canvas');
  };

  const stats = {
    total: wireframes.length,
    desktop: wireframes.filter(w => w.device === 'desktop').length,
    tablet: wireframes.filter(w => w.device === 'tablet').length,
    mobile: wireframes.filter(w => w.device === 'mobile').length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">UI Wireframes & Mapping</h1>
            <p className="text-gray-600 dark:text-gray-400">Design system wireframes with annotations and responsive layouts</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button>
              <Layers className="w-4 h-4 mr-2" />
              New Wireframe
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Wireframes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <Layers className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Desktop</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.desktop}</p>
                </div>
                <Monitor className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tablet</p>
                  <p className="text-2xl font-bold text-green-600">{stats.tablet}</p>
                </div>
                <Tablet className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.mobile}</p>
                </div>
                <Smartphone className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <select
                  value={deviceFilter}
                  onChange={(e) => setDeviceFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Devices</option>
                  <option value="desktop">Desktop</option>
                  <option value="tablet">Tablet</option>
                  <option value="mobile">Mobile</option>
                </select>
                
                <select
                  value={pageTypeFilter}
                  onChange={(e) => setPageTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Page Types</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="form">Form</option>
                  <option value="list">List</option>
                  <option value="detail">Detail</option>
                  <option value="landing">Landing</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'canvas' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('canvas')}
                  disabled={!selectedWireframe}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Canvas View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWireframes.map((wireframe) => (
              <WireframeCard
                key={wireframe.id}
                wireframe={wireframe}
                onView={handleViewWireframe}
              />
            ))}
          </div>
        ) : selectedWireframe ? (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant="outline"
                onClick={() => setViewMode('grid')}
              >
                ← Back to Grid
              </Button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedWireframe.name}
              </h2>
            </div>
            <WireframeCanvas wireframe={selectedWireframe} />
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a wireframe to view</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a wireframe from the grid view to see detailed annotations and measurements.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Design System Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Design System Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Spacing System</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base unit:</span>
                    <span className="font-mono">8px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Small spacing:</span>
                    <span className="font-mono">4px, 8px, 12px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium spacing:</span>
                    <span className="font-mono">16px, 24px, 32px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Large spacing:</span>
                    <span className="font-mono">48px, 64px, 96px</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Breakpoints</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mobile:</span>
                    <span className="font-mono">320px - 767px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tablet:</span>
                    <span className="font-mono">768px - 1023px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Desktop:</span>
                    <span className="font-mono">1024px+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max width:</span>
                    <span className="font-mono">1200px</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Component Sizes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Button height:</span>
                    <span className="font-mono">32px, 40px, 48px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Input height:</span>
                    <span className="font-mono">40px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Header height:</span>
                    <span className="font-mono">64px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sidebar width:</span>
                    <span className="font-mono">256px</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};