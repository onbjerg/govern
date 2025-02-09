/*
 * SPDX-License-Identifier:    MIT
 */

// Inspired by: https://github.com/optionality/clone-factory

pragma solidity ^0.6.8;

library ERC1167ProxyFactory {
    function clone(address _implementation) internal returns (address cloneAddr) {
        bytes memory code = generateCode(_implementation);

        assembly {
            cloneAddr := create(0, add(code, 0x20), 55)
        }
        
        require(cloneAddr != address(0), "proxy-factory: bad create");
    }

    function clone(address _implementation, bytes memory _initData) internal returns (address cloneAddr) {
        cloneAddr = clone(_implementation);
        (bool ok, ) = cloneAddr.call(_initData);
        require(ok, "proxy-factory: bad init");
    }

    function clone2(address _implementation, bytes32 _salt) internal returns (address cloneAddr) {
        bytes memory code = generateCode(_implementation);
        
        assembly {
            cloneAddr := create2(0, add(code, 0x20), 55, _salt)
        }
        
        require(cloneAddr != address(0), "proxy-factory: bad create2");
    }

    function clone2(address _implementation, bytes32 _salt, bytes memory _initData) internal returns (address cloneAddr) {
        cloneAddr = clone2(_implementation, _salt);
        (bool ok, ) = cloneAddr.call(_initData);
        require(ok, "proxy-factory: bad init");
    }

    function generateCode(address _implementation) internal pure returns (bytes memory code) {
        code = new bytes(55);
        
        assembly {
            mstore(add(code, 0x20), 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(code, 0x34), shl(0x60, _implementation))
            mstore(add(code, 0x48), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
        }
    }
}
