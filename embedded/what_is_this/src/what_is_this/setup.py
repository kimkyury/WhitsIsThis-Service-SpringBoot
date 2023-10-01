from setuptools import setup

package_name = 'what_is_this'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='SSAFY',
    maintainer_email='hw2ny1@gmail.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
        'what_is_this_main=what_is_this.what_is_this_main:main',
        'run_mapping=what_is_this.run_mapping:main',
        'move_for_map=what_is_this.move_for_map:main',
        'searching_global_path=what_is_this.searching_global_path:main',
        'make_local_path=what_is_this.make_local_path:main',
        'odom=what_is_this.odom:main',
        'path_tracking=what_is_this.path_tracking:main',
        'web_socket=what_is_this.web_socket:main',
        ],
    },
)
