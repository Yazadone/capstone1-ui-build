import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md p-6 text-white">
            <p className="text-sm font-medium opacity-90">Total Users</p>
            <p className="text-4xl font-bold mt-2">1,234</p>
            <p className="text-xs opacity-75 mt-2">+12% this month</p>
          </div>
          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-md p-6 text-white">
            <p className="text-sm font-medium opacity-90">Active Requests</p>
            <p className="text-4xl font-bold mt-2">48</p>
            <p className="text-xs opacity-75 mt-2">5 pending approval</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
            <p className="text-sm font-medium opacity-90">Datasets</p>
            <p className="text-4xl font-bold mt-2">156</p>
            <p className="text-xs opacity-75 mt-2">2 new this week</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <p className="text-sm font-medium opacity-90">Analyses</p>
            <p className="text-4xl font-bold mt-2">892</p>
            <p className="text-xs opacity-75 mt-2">12 running</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200 flex">
            {['overview', 'users', 'requests', 'datasets'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { user: 'Dr. Smith', action: 'Submitted access request', dataset: 'RNA-Seq Atlas', time: '2 hours ago' },
                    { user: 'Prof. Johnson', action: 'Started analysis', dataset: 'SNP Data', time: '4 hours ago' },
                    { user: 'Dr. Lee', action: 'Downloaded dataset', dataset: 'Single Cell', time: '6 hours ago' },
                    { user: 'Team Alpha', action: 'Uploaded new dataset', dataset: 'Microarray Data', time: '1 day ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.dataset}</p>
                      </div>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">User Management</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Role</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Dr. Smith', email: 'smith@example.com', role: 'Researcher', status: 'Active' },
                      { name: 'Prof. Johnson', email: 'johnson@example.com', role: 'Admin', status: 'Active' },
                      { name: 'Dr. Lee', email: 'lee@example.com', role: 'Researcher', status: 'Active' },
                    ].map((user, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.role}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-600 hover:text-primary-700 font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'requests' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Access Requests</h3>
                <div className="space-y-4">
                  {[
                    { user: 'Dr. Williams', dataset: 'RNA-Seq Atlas', status: 'Pending', date: '2026-04-26' },
                    { user: 'Dr. Brown', dataset: 'SNP Data', status: 'Pending', date: '2026-04-25' },
                    { user: 'Prof. Miller', dataset: 'Single Cell', status: 'Approved', date: '2026-04-24' },
                  ].map((req, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{req.user}</p>
                        <p className="text-sm text-gray-600">{req.dataset}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          req.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {req.status}
                        </span>
                        {req.status === 'Pending' && (
                          <>
                            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                              Deny
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'datasets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Dataset Management</h3>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                    + Upload Dataset
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Title</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Samples</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'RNA-Seq Atlas', type: 'Expression', samples: 150, status: 'Active' },
                      { title: 'SNP Data', type: 'SNP', samples: 500, status: 'Active' },
                      { title: 'Single Cell', type: 'Sequencing', samples: 50000, status: 'Active' },
                    ].map((ds, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="py-3 px-4">{ds.title}</td>
                        <td className="py-3 px-4">{ds.type}</td>
                        <td className="py-3 px-4">{ds.samples.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {ds.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-600 hover:text-primary-700 font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
