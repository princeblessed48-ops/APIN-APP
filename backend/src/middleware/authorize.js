function authorize(allowedRoles = [], allowedPermissions = []) {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const roleMatch = allowedRoles.length === 0 || allowedRoles.includes(user.role);
    const permissionMatch =
      allowedPermissions.length === 0 ||
      allowedPermissions.some((permission) => user.permissions?.includes(permission));

    if (roleMatch && permissionMatch) {
      return next();
    }

    return res.status(403).json({
      message: 'You do not have permission to perform this action.'
    });
  };
}

module.exports = { authorize };
