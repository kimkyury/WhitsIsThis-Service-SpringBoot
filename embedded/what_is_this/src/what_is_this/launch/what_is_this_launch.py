from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='what_is_this',
            node_executable='what_is_this_main',
            node_name='what_is_this_main'
        ),
        Node(
            package='what_is_this',
            node_executable='web_socket',
            node_name='web_socket'
        ),
        Node(
            package='what_is_this',
            node_executable='run_mapping',
            node_name='run_mapping'
        ),
        Node(
            package='what_is_this',
            node_executable='move_for_map',
            node_name='move_for_map'
        ),
        Node(
            package='what_is_this',
            node_executable='searching_global_path',
            node_name='searching_global_path'
        ),
        Node(
            package='what_is_this',
            node_executable='make_local_path',
            node_name='make_local_path'
        ),
        Node(
            package='what_is_this',
            node_executable='odom',
            node_name='odom'
        ),
        Node(
            package='what_is_this',
            node_executable='path_tracking',
            node_name='path_tracking'
        ),
    ])



