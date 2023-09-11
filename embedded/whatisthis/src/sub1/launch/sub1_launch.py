from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='sub1',
            node_executable='perception',
            node_name='perception'
        ),
        Node(
            package='sub1',
            node_executable='controller',
            node_name='controller'
        ),
        Node(
            package='sub1',
            node_executable='publisher',
            node_name='publisher'
        ),
        Node(
            package='sub1',
            node_executable='subscriber',
            node_name='subscriber'
        ),
        Node(
            package='sub1',
            node_executable='handcontrol',
            node_name='handcontrol'
        ),
        Node(
            package='sub1',
            node_executable='odom',
            node_name='odom'
        ),
        Node(
            package='sub1',
            node_executable='path_pub',
            node_name='path_pub'
        ),
        Node(
            package='sub1',
            node_executable='path_tracking',
            node_name='path_tracking'
        ),
    ])



