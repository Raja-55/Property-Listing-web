import { useState } from 'react'
import { ChevronDown, ChevronRight, Folder, MapPin } from 'lucide-react'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

function TreeNode({ node, depth = 0, onSelect, selectedName }) {
  const [isOpen, setIsOpen] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="space-y-1">
      <div
        onClick={() => onSelect(node)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
          selectedName === node.name
            ? 'bg-blue-600 text-white shadow-xs'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            className="p-0.5 rounded hover:bg-slate-200/50"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-4" />
        )}
        {hasChildren ? (
          <Folder size={15} className={selectedName === node.name ? 'text-white' : 'text-blue-500'} />
        ) : (
          <MapPin size={15} className={selectedName === node.name ? 'text-white' : 'text-rose-500'} />
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {hasChildren && isOpen && (
        <div className="space-y-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedName={selectedName}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function LocationsPage() {
  const { data: locations, isLoading } = useAdminResource('locations', () =>
    adminRepository.getLocations(),
  )
  const [selectedNode, setSelectedNode] = useState({
    name: 'ABC Residency',
    type: 'Society/Project',
    city: 'Kolkata',
    parentLocality: 'Salt Lake',
  })

  if (isLoading || !locations) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Location Hierarchy...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Location Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Hierarchical structure of regions, states, cities, localities, and property projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Tree View */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
            Location Hierarchy Tree
          </h3>
          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
            {locations.map((rootNode) => (
              <TreeNode
                key={rootNode.name}
                node={rootNode}
                onSelect={(node) =>
                  setSelectedNode({
                    name: node.name,
                    type: node.children ? 'Locality' : 'Society/Project',
                    city: 'Kolkata',
                    parentLocality: 'Salt Lake',
                  })
                }
                selectedName={selectedNode?.name}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5">
              Edit Location Entry
            </h3>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-xl">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Type</label>
                <select
                  value={selectedNode.type}
                  onChange={(e) => setSelectedNode({ ...selectedNode, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Country</option>
                  <option>State</option>
                  <option>City</option>
                  <option>Locality</option>
                  <option>Society/Project</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Name</label>
                <input
                  type="text"
                  value={selectedNode.name}
                  onChange={(e) => setSelectedNode({ ...selectedNode, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">City</label>
                  <select
                    value={selectedNode.city}
                    onChange={(e) => setSelectedNode({ ...selectedNode, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option>Kolkata</option>
                    <option>Mumbai</option>
                    <option>Bengaluru</option>
                    <option>Delhi NCR</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Parent Locality</label>
                  <select
                    value={selectedNode.parentLocality}
                    onChange={(e) => setSelectedNode({ ...selectedNode, parentLocality: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option>Salt Lake</option>
                    <option>New Town</option>
                    <option>Powai</option>
                    <option>Indiranagar</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 rounded-xl transition-all"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
