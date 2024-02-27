export default function Leaderboard() {
    return (
    <div class="site-wrapper">
        <nav class="navbar navbar-fixed-top">
            <div class="nav-container">
                <div class="nav-group">
                    <a class="navbar-text-logo" href="#">Garden App</a>
                </div>
                <div class="nav-group">
                    <a class="nav-group-element">Login</a>
                    <a class="">Register</a>
                </div>
            </div>
        </nav>

        <div class="leaderboard-wrapper">
            <div class="leaderboard">
                <table>
                    <thead id="header">
                    <tr>
                        <th>Place</th>
                        <th>Username</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                        <tr class="userRow">
                            <td>Place</td>
                            <td>User</td>
                            <td>Point</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}