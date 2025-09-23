import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  TrendingUp, 
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HomePageProps {
  user: {
    name: string;
    role: string;
  };
}

export const HomePage = ({ user }: HomePageProps) => {
  const stats = [
    {
      title: 'Active Lesson Plans',
      value: '12',
      icon: BookOpen,
      change: '+2 this week',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Students Enrolled',
      value: '156',
      icon: Users,
      change: '+8 new students',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Upcoming Classes',
      value: '8',
      icon: Calendar,
      change: 'Next: 2:00 PM',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      title: 'Assignments Due',
      value: '23',
      icon: FileText,
      change: '5 due today',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  const recentPlans = [
    {
      id: 1,
      title: 'Shakespearean Sonnets Analysis',
      subject: 'Poetry',
      grade: 'Grade 11',
      progress: 75,
      dueDate: '2024-01-15',
      status: 'active',
    },
    {
      id: 2,
      title: 'Modern American Literature',
      subject: 'Literature',
      grade: 'Grade 12',
      progress: 45,
      dueDate: '2024-01-20',
      status: 'draft',
    },
    {
      id: 3,
      title: 'Creative Writing Workshop',
      subject: 'Writing',
      grade: 'Grade 10',
      progress: 100,
      dueDate: '2024-01-10',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to create inspiring literature lessons today?
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                <Plus className="w-5 h-5 mr-2" />
                Create New Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Lesson Plans */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Lesson Plans</CardTitle>
                    <CardDescription>
                      Your latest instructional materials and progress
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {plan.title}
                          </h3>
                          <Badge className={getStatusColor(plan.status)}>
                            {plan.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{plan.subject}</span>
                          <span>•</span>
                          <span>{plan.grade}</span>
                          <span>•</span>
                          <span>Due: {plan.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={plan.progress} className="flex-1 max-w-32" />
                          <span className="text-sm text-gray-600 min-w-0">
                            {plan.progress}%
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  New Lesson Plan
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Grade Submissions
                </Button>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lessons Completed</span>
                  <span className="font-semibold">8/10</span>
                </div>
                <Progress value={80} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Student Engagement</span>
                  <span className="font-semibold">92%</span>
                </div>
                <Progress value={92} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Assignments Graded</span>
                  <span className="font-semibold">15/18</span>
                </div>
                <Progress value={83} />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Sarah Johnson</span> submitted her essay
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      New comment on <span className="font-medium">Poetry Analysis</span>
                    </p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Grade 11 Literature</span> class scheduled
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};